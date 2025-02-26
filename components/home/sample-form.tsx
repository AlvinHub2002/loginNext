"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import { useMemo } from "react";
import { generateFormSchema } from "@/lib/generate-form-schema";
import { FormSchema } from "@/types/form-schema";
import { useEffect, useState } from "react";

interface FormProps {
  formData: FormSchema;
}

export function SampleForm({ formData }: FormProps) {
  const [formSchema, setFormSchema] = useState(generateFormSchema(formData.formFields));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData.formFields.reduce((acc, field) => {
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
  const watchFieldsArray = formData.formFields
    .filter((field) => field.conditionalLogic)
    .map((field) => watch(field.conditionalLogic?.fieldId || ""));

  const visibleFields = useMemo(() => {
    return formData.formFields.filter((field) => {
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
  }, watchFieldsArray);

  useEffect(() => {
    const newSchema = generateFormSchema(visibleFields);
    setFormSchema(newSchema);
  }, [visibleFields]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-10 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">{formData.formTitle}</h2>
        <p className="text-center mb-4 text-gray-600">{formData.description}</p>

        {visibleFields.map((field) => (
          <FormField
            key={field.fieldId}
            control={control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}{field.required && <span className="text-destructive"> *</span>}</FormLabel>
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
                        // TODO: Change type of RadioItem from string to a object with id, label and value
                        return (
                          <RadioGroup
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                          >
                            {field.options?.map((option) => (
                              <FormItem
                                key={option}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{option}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        );

                      case "Multiple choice":
                        // TODO: Change type of Checkbox option from string to a object with id, label and value
                        return (
                          <div className="flex flex-col gap-2">
                            {field.options?.map((option) => (
                              <FormField
                                key={option}
                                control={form.control}
                                name={field.fieldId}
                                render={({ field: formField }) => (
                                  <FormItem
                                    key={option}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={formField.value?.includes(option)}
                                        onCheckedChange={(checked) => {
                                          formField.onChange(
                                            checked
                                              ? [...(formField.value || []), option]
                                              : formField.value?.filter((v: string) => v !== option)
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {option}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        );

                      case "File upload":
                        return (
                          <Controller
                            control={control}
                            name={field.fieldId}
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

                      case "Date Picker":
                        // TODO: Use shadcn input field instead of mui datepicker input field
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              control={control}
                              name={field.fieldId}
                              render={({ field: formField }) => (
                                <div className="w-full">
                                  <DatePicker
                                    value={formField.value ? dayjs(formField.value, "DD/MM/YYYY") : null}
                                    onChange={(newValue) =>
                                      formField.onChange(newValue ? newValue.format("DD/MM/YYYY") : "")
                                    }
                                    format="DD/MM/YYYY"
                                    slotProps={{
                                      textField: {
                                        fullWidth: true,
                                        placeholder: field?.placeholder,
                                        sx: {
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
                        )

                      case "Time picker":
                        // TODO: Use shadcn input field instead of mui datepicker input field
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              control={control}
                              name={field.fieldId}
                              render={({ field: formField }) => (
                                <div className="w-full">
                                  <TimePicker
                                    value={formField.value ? dayjs(formField.value, "HH:mm") : null}
                                    onChange={(newValue) =>
                                      formField.onChange(newValue ? newValue.format("HH:mm") : "")
                                    }
                                    slotProps={{
                                      textField: {
                                        fullWidth: true,
                                        placeholder: field.placeholder,
                                        sx: {
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
