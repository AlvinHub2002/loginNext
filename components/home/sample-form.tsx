"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sampleForm } from './sampleData'
import { useMemo } from "react";



const FormSchema = z.object(
  sampleForm.formFields.reduce((acc: Record<string, any>, field) => {
    let schema;
    switch (field.fieldType) {
      case "Short Input Fields":
      case "IEEE Member ID":
      case "Email":
      case "Date Picker":
      case "Time picker":
        schema = z.string().min(1, `${field.label} is required`);
        break;

      case "Text area":
        schema = z
          .string()
          .min(field.minWords || 10, `${field.label} is too short`)
          .max(field.maxWords || 200, `${field.label} is too long`)
        break;

      case "Radio":
      case "Dropdown":
        schema = z.string().min(1, `Please select ${field.label}`);
        break;

      case "Multiple choice":
        schema = z.array(z.string()).min(1, `Please select at least one ${field.label}`);
        break;

      case "File upload":
        schema = z.any().refine((file) => {
          if (!file) return false;
          if (!field.fileTypes?.includes(file?.name.split(".").pop())) return false;
          return file.size <= (field.maxFileSize || 5) * 1024 * 1024;
        }, `Invalid file type or size for ${field.label}`);
        break;

      default:
        schema = z.string().optional();
    }

    if (field.conditionalLogic) {
      schema = schema.optional();
    }

    acc[field.fieldId] = schema;
    return acc;
  }, {})
);

export function SampleForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: sampleForm.formFields.reduce((acc, field) => {
      acc[field.fieldId] = "";
      acc[field.fieldId] = field.fieldType === "Multiple choice" ? [] : "";
      return acc;
    }, {} as Record<string, any>),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const watchFields = watch() as Record<string, any>;
  const visibleFields = useMemo(() => {
    return sampleForm.formFields.filter((field) => {
      if (!field.conditionalLogic) return true;

      const { fieldId, value, operator } = field.conditionalLogic;
      const dependencyValue = watchFields[fieldId];

      switch (operator) {
        case "equals":
          return dependencyValue === value;
        case "not_equals":
          return dependencyValue !== value;
        default:
          return true;
      }
    });
  }, [watchFields]);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-10 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">{sampleForm.formTitle}</h2>
        <p className="text-center mb-4 text-gray-600">{sampleForm.description}</p>

        {visibleFields.map((field) => (
          <FormField
            key={field.fieldId}
            control={control}
            name={field.fieldId as keyof z.infer<typeof FormSchema>}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {(() => {
                    switch (field.fieldType) {

                      case "Short Input Fields":
                      case "IEEE Member ID":
                      case "Email":
                        return (
                          <Input
                            type={field.fieldType === "Email" ? "email" : "text"}
                            {...formField}
                            className="border p-2 rounded w-full"
                          />
                        );

                      case "Text area":
                        return (
                          <Textarea
                            {...formField}
                            className="border p-2 rounded w-full resize-none"
                          />
                        );

                      case "Date Picker":
                        return (
                          <input type="date" {...formField} className="border p-2 rounded w-full" />
                        )

                      case "Dropdown":
                        return (
                          <Select
                            onValueChange={formField.onChange}
                            value={formField.value || ""}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );

                      case "Radio":
                        return (
                          <RadioGroup
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                          >
                            {field.options?.map((option) => (
                              <FormItem
                                key={option}
                                className="flex items-center space-x-3"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel>{option}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        );


                      case "Multiple choice":
                        return (
                          <div className="flex flex-col gap-2">
                            {field.options?.map((option) => (
                              <Controller
                                control={control}
                                name={field.fieldId as keyof z.infer<typeof FormSchema>}
                                key={option}
                                render={({ field: controllerField }) => (
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={controllerField.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        controllerField.onChange(
                                          checked
                                            ? [...(controllerField.value || []), option]
                                            : controllerField.value?.filter((v: string) => v !== option)
                                        );
                                      }}
                                    />
                                    <FormLabel>{option}</FormLabel>
                                  </div>
                                )}
                              />
                            ))}
                          </div>
                        );

                      case "File upload":
                        return (
                          <Controller
                            control={control}
                            name={field.fieldId as keyof z.infer<typeof FormSchema>}
                            render={({ field: { onChange, ref } }) => (
                              <Input
                                type="file"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                ref={ref}
                                className="border p-2 rounded w-full"
                              />
                            )}
                          />
                        );

                      case "Time picker":
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              control={control}
                              name={field.fieldId}
                              render={({ field }) => (
                                <div className="w-full mt-2">
                                  <TimePicker
                                    label="Time"
                                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                                    onChange={(newValue) =>
                                      field.onChange(newValue ? newValue.format("HH:mm") : "")
                                    }
                                    slotProps={{
                                      textField: {
                                        fullWidth: true,
                                        sx: {
                                          mt: 1,
                                          borderRadius: "8px",
                                          "& .MuiOutlinedInput-root": {
                                            minHeight: "38px",
                                            height: "38px",
                                            padding: "4px 10px",
                                            fontSize: "14px",
                                          },

                                        },
                                      },
                                    }}
                                  />
                                </div>
                              )}
                            />
                          </LocalizationProvider>
                        );

                      default:
                        return null;
                    }
                  })()}
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage>{errors[field.fieldId]?.message as string}</FormMessage>
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-end">
          <Button type="submit" className="w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
