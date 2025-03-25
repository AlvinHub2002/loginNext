
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea";
import { DynamicList } from "../ui/dynamic-list";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { FormItem, FormLabel, FormDescription, FormMessage, FormControl, FormField } from "../ui/form";

import generateDataGridSchema from "@/lib/generate-data-grid-schema";
import { getConditionalLogicDependencies } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";

interface FormInputFieldProps {
    field: any;
    form: any;
}

interface FormElementWrapperProps {
    field: any;
    form: any;
    children: any
}

export function FormElementWrapper({ form, field, children }: FormElementWrapperProps) {
    return <FormField
        key={field.fieldId}
        control={form.control}
        name={field.fieldId}
        render={() => (
            <FormItem>
                <FormLabel>
                    {field.fieldType !== "Sub Heading" ? field.label : <h1 className="text-lg">{field.label}</h1>}
                    {field.required && <span className="text-destructive"> *</span>}
                </FormLabel>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormControl>
                    {children}
                </FormControl>
                <FormMessage />
            </FormItem>)}
    />
}

export function FormInputField({ field, form }: FormInputFieldProps) {
    return <>
        <Input
            type={field.fieldType === "Email" ? "email" : "text"}
            {...form.register(field.fieldId)}
            className="border p-2 rounded w-full" />
    </>;
}

export function FormSelectField({ field, form }: FormInputFieldProps) {
    return <>
        <Controller
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => <Select onValueChange={formField.onChange}
                value={formField.value || ""}>
                <SelectTrigger >
                    <SelectValue placeholder={field.placeholder && ""} />
                </SelectTrigger>
                <SelectContent>
                    {field.options?.map((option: string) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>}
        />
    </>;
}

export function FormTextAreaField({ field, form }: FormInputFieldProps) {
    return <>
        <Textarea
            {...form.register(field.fieldId)}
            className="border p-2 rounded w-full" />
    </>;
}

export function FormMultiChoiceField({ field, form }: FormInputFieldProps) {
    return <div className="flex flex-col gap-2">
        {field.options?.map((option: string) => (
            <Controller
                key={option}
                control={form.control}
                name={field.fieldId}
                render={({ field: formField }) => (
                    <FormItem key={option}
                        className="flex flex-row items-center space-x-3 space-y-0">
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
                        <FormLabel
                            className="text-sm font-normal">{option}</FormLabel>
                    </FormItem>
                )}
            />
        ))}
    </div>;
}

export function FormDataGridField({ field, form }: FormInputFieldProps) {
    if (!field.dataGrid) return null;
    return <div key={field.fieldId}>
        <FormLabel>{field.label} {field.required && <span className="text-destructive"> *</span>}</FormLabel>
        <FormDescription>{field.description}</FormDescription>
        <DynamicList fieldName={field.fieldId} key={field.fieldId} control={form.control} columns={generateDataGridSchema(field.dataGrid)} initialRows={[]} />
    </div>;
}

export function FormFileUploadField({ field, form }: FormInputFieldProps) {
    return <Controller
        control={form.control}
        name={field.fieldId}
        render={({ field: { onChange, ref } }) => (
            <Input
                type="file"
                onChange={(e) => onChange(e.target.files?.[0])}
                ref={ref}
                className="border p-2 rounded w-full"
            />
        )}
    />;
}

export function FormDatePickerField({ field, form }: FormInputFieldProps) {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
            control={form.control}
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
    </LocalizationProvider>;
}

export function FormTimePickerField({ field, form }: FormInputFieldProps) {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
            control={form.control}
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
    </LocalizationProvider>;
}

export default function FormElementsHandler({ form, field }: FormInputFieldProps) {
    const [show, setShow] = useState(false);
    const { watch } = form;
    // Memoize the getConditionalLogicDependencies function
    const memoizedGetConditionalLogicDependencies = useCallback((fieldLogic: any, fieldValue: any) => {
        return getConditionalLogicDependencies(fieldLogic, fieldValue);
    }, []);

    useEffect(() => {
        if (field.conditionalLogic) {
            // Watch the field defined by conditionalLogic.fieldId
            const watchFieldId = field.conditionalLogic.fieldId;

            const subscription = watch((value: any) => {
                // Handling conditional logic here
                const fieldValue = value[watchFieldId];
                setShow(memoizedGetConditionalLogicDependencies(field.conditionalLogic, fieldValue));
            });

            // Cleanup function (if needed) - no explicit unsubscribe is required for `watch`
            return () => subscription.unsubscribe();
        } else {
            // If no conditionalLogic, set show to true directly
            setShow(true);
        }
    }, [field.conditionalLogic, watch, memoizedGetConditionalLogicDependencies]);

    return show ? (
        <>
            {(() => {
                switch (field.fieldType) {

                    case "Short Input Fields":
                    case "IEEE Member ID":
                    case "Email":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormInputField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Text area":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormTextAreaField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Dropdown":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormSelectField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Multiple choice":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormMultiChoiceField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Dynamic List":
                        return <FormDataGridField form={form} field={field} />;

                    case "File upload":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormFileUploadField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Date Picker":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormDatePickerField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    case "Time picker":
                        return (
                            <FormElementWrapper form={form} field={field} >
                                <FormTimePickerField form={form} field={field} />
                            </FormElementWrapper >
                        );

                    default:
                        return null;
                }
            })()}
        </>
    ) : <></>;
}
