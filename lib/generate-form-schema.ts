import { z } from "zod";
import { FormField } from "@/types/form-schema";

export const generateFormSchema = (formFields: FormField[]) => {
    return z.object(
        formFields.reduce((acc: Record<string, any>, field) => {
            let schema;
            switch (field.fieldType) {
                case "Short Input Fields":
                    schema = z
                        .string()
                        .min(field.required ? 1 : 0, `${field.label} is required`)
                        .refine((value) => checkMinWord(value, field.minWords), {
                            message: `Minimum ${field.minWords} words required`,
                        })
                        .refine((value) => checkMaxWord(value, field.maxWords), {
                            message: `Maximum ${field.maxWords} words allowed`,
                        });
                    break;

                case "IEEE Member ID":
                    schema = z.string();
                    break;

                case "Email":
                    schema = z
                        .string()
                        .min(field.required ? 1 : 0, `${field.label} is required`)
                        .email("Invalid email address")
                    break;

                case "Date Picker":
                case "Time picker":
                    schema = z.string().min(1, `${field.label} is required`);
                    break;

                case "Text area":
                    schema = z
                        .string()
                        .min(field.required ? 1 : 0, `${field.label} is required`)
                        .refine((value) => checkMinWord(value, field.minWords), {
                            message: `Minimum ${field.minWords} words required`,
                        })
                        .refine((value) => checkMaxWord(value, field.maxWords), {
                            message: `Maximum ${field.maxWords} words allowed`,
                        });
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
                case "Dynamic List":
                    schema = z.any()
                    break;

                case "Sub Heading":
                    return acc;

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
};


const checkMinWord = (value: string, minWords: number | undefined) => {
    if (minWords === undefined) return true;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= minWords;
};

const checkMaxWord = (value: string, maxWords: number | undefined) => {
    if (maxWords == undefined) return true;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount <= maxWords;
};