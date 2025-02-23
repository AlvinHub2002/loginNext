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
import { MyFormField, formFields } from "./formFields";
import { useMemo } from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),

  email: z.string().email("Invalid email"),

  gender: z.string().min(1, "Please select an option"),

  hobbies: z.array(z.string()).min(1, "Please select at least one"),

  upload: z.any(),

  isMember: z.string().min(1, "Please select an option"),

  ieeeId: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, {
      message: "IEEE ID must be at least 5 characters if provided.",
    }),

  dob: z
    .string()
    .refine((val) => val.trim() !== "", "Date of Birth is required"),

  time: z.string().min(1, "Please select a time"),

});

export function SampleForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      bio: "",
      email: "",
      isMember: "",
      ieeeId: "",
      gender: "",
      hobbies: [],
      upload: "",
      dob: "",
      time: "",
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const watchFields = watch();
  const visibleFields = useMemo(() => {
    return formFields.filter((field) => {
      if (!field.dependsOn) return true;
      const dependencyValue =
        watchFields[field.dependsOn as keyof z.infer<typeof FormSchema>];
      return typeof field.showIf === "function"
        ? field.showIf(dependencyValue)
        : dependencyValue === field.showIf;
    });
  }, [watchFields]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 p-10 w-full max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">IEEE Form </h2>
        {visibleFields.map((field) => (
          <FormField
            key={field.name}
            control={control}
            name={field.name as keyof z.infer<typeof FormSchema>}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {(() => {
                    switch (field.type) {
                      case "text":
                      case "email":
                      case "number":
                      case "date":
                        return (
                          <Input
                            type={field.type}
                            {...formField}
                            className="border p-2 rounded w-full"
                          />
                        );

                      case "textarea":
                        return (
                          <Textarea
                            {...formField}
                            className="border p-2 rounded w-full resize-none"
                          />
                        );

                      case "select":
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

                      case "multiselect":
                        return (
                          <div className="flex flex-col gap-2">
                            {field.options?.map((option) => (
                              <Controller
                                control={control}
                                name={
                                  field.name as keyof z.infer<typeof FormSchema>
                                }
                                key={option}
                                render={({ field: controllerField }) => (
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={controllerField.value?.includes(
                                        option
                                      )}
                                      onCheckedChange={(checked) => {
                                        controllerField.onChange(
                                          checked
                                            ? [
                                              ...((controllerField.value as string[]) ||
                                                []),
                                              option,
                                            ]
                                            : (
                                              controllerField.value as string[]
                                            )?.filter(
                                              (value) => value !== option
                                            )
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

                      case "radio":
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

                      case "file":
                        return (
                          <Controller
                            control={control}
                            name={
                              field.name as keyof z.infer<typeof FormSchema>
                            }
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
                      case "time":
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              control={control}
                              name="time"
                              render={({ field }) => (
                                <TimePicker
                                  label="Select Time"
                                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                                  onChange={(newValue) => {
                                    field.onChange(newValue ? newValue.format("HH:mm") : "");
                                  }}
                                  slotProps={{
                                    textField: {
                                      fullWidth: true,

                                    },
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        );



                      default:
                        return null;
                    }
                  })()}
                </FormControl>

                {field.helperText && (
                  <FormDescription>{field.helperText}</FormDescription>
                )}

                <FormMessage>
                  {
                    errors[field.name as keyof z.infer<typeof FormSchema>]
                      ?.message as string
                  }
                </FormMessage>
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end">
          <Button type="submit" className="w-auto ">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
