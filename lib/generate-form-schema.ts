import { z } from "zod";
import { sampleForm } from "../components/home/sampleData";

export const generateFormSchema = () => {
    return z.object(
        sampleForm.formFields.reduce((acc: Record<string, any>, field) => {
            let schema;
            switch (field.fieldType) {
                case "Short Input Fields":
                case "IEEE Member ID":
                    schema = z.string();
                    break;
                case "Email":
                    schema = field.required
                        ? z.string().email("Invalid email address")
                        : z.string().optional();
                    break;
                case "Date Picker":
                case "Time picker":
                    schema = z.string().min(1, `${field.label} is required`);
                    break;

                case "Text area":
                    schema = z
                        .string()
                        .min(field.minWords || 10, `${field.label} is too short`)
                        .max(field.maxWords || 200, `${field.label} is too long`);
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
};