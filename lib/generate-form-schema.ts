import { z } from "zod";
import { FormField } from "@/types/form-schema";

// Helper function to evaluate conditional logic for cross-field validation
const evaluateCondition = (
    field: FormField,
    formData: Record<string, any>
): boolean => {
    if (!field.conditionalLogic) return true; // No conditional logic, always true (no condition)

    const { fieldId, value, operator } = field.conditionalLogic;
    const targetFieldValue = formData[fieldId]; // Value of the field being referred to for condition check

    // Evaluate condition based on the operator
    switch (operator) {
        case "equals": {
            if (Array.isArray(targetFieldValue)) {
                return targetFieldValue.includes(value);
            }
            else
                return targetFieldValue === value; // Check if field value equals the specified value
        }
        // Additional operators can be added here as needed
        default:
            return false; // Default case if operator doesn't match
    }
};

// Main function to generate the Zod validation schema for the form fields
export const generateFormSchema = (formFields: FormField[]) => {
    return z.object(
        formFields.reduce((acc: Record<string, any>, field) => {
            let schema;

            const isRequired = (field.required && !field.conditionalLogic) ? 1 : 0;
            // Determine the validation schema based on the field type
            switch (field.fieldType) {
                case "Short Input Fields":
                    // Validation for short input fields
                    schema = z
                        .string()
                        .min(isRequired, `${field.label} is required`) // Make field required if necessary
                        .refine((value) => checkMinWord(value, field.minWords), {
                            message: `Minimum ${field.minWords} words required`,
                        })
                        .refine((value) => checkMaxWord(value, field.maxWords), {
                            message: `Maximum ${field.maxWords} words allowed`,
                        });
                    break;

                case "IEEE Member ID":
                    schema = z.string(); // Simple string validation for IEEE Member ID
                    break;

                case "Email":
                    schema = z
                        .string()
                        .min(isRequired, `${field.label} is required`);
                    // Uncomment the line below to enforce email validation
                    // .email("Invalid email address");
                    break;

                case "Date Picker":
                case "Time picker":
                    schema = z.string().min(isRequired, `${field.label} is required`); // Ensure the date/time is selected
                    break;

                case "Text area":
                    // Validation for text areas with word count checks
                    schema = z
                        .string()
                        .min(isRequired, `${field.label} is required`)
                        .refine((value) => checkMinWord(value, field.minWords), {
                            message: `Minimum ${field.minWords} words required`,
                        })
                        .refine((value) => checkMaxWord(value, field.maxWords), {
                            message: `Maximum ${field.maxWords} words allowed`,
                        });
                    break;

                case "Radio":
                case "Dropdown":
                    schema = z.string().min(isRequired, `Please select ${field.label}`); // Ensure a selection is made
                    break;

                case "Multiple choice":
                    schema = z.array(z.string()).min(isRequired, `Please select at least one ${field.label}`); // Ensure at least one option is selected
                    break;

                case "File upload":
                    // Validation for file uploads, ensuring correct file type and size
                    schema = z.any().refine((file) => {
                        if (!file && isRequired) return false;
                        if (file) {
                            console.log(field.fileTypes?.includes(file?.name.split(".").pop()))
                            if (!field.fileTypes?.includes(file?.name.split(".").pop())) return false;
                            return file.size <= (field.maxFileSize || 5) * 1024 * 1024; // Check max file size (default 5MB)
                        }
                        return true
                    }, `Invalid file type or size for ${field.label}`);
                    break;

                case "Dynamic List":
                    schema = z.any() // No validation for dynamic lists, can be customized as needed
                    // schema = z.array(z.any()).min(2, `${field.label} is required`); // No validation for dynamic lists, can be customized as needed
                    break;

                case "Sub Heading":
                    return acc; // No validation for subheadings, just skip them
                default:
                    schema = z.string().optional(); // Default case for unrecognized field types
            }

            acc[field.fieldId] = schema; // Add the schema to the accumulator using the field's ID
            return acc;
        }, {})
    ).superRefine((data, ctx) => {
        // Additional refinement to handle conditional logic for required fields
        formFields.forEach((field) => {
            if (field.conditionalLogic) {

                if (evaluateCondition(field, data)) {
                    // If the condition is satisfied, make the field required
                    if (!data[field.fieldId] || data[field.fieldId] === "") {
                        ctx.addIssue({
                            path: [field.fieldId], // Specify the field in which the issue occurred
                            message: `${field.label} is required`, // Error message
                            code: z.ZodIssueCode.custom, // Custom error code
                        });
                    }
                }
                //  else {
                //     data[field.fieldId] = "";
                // }
            }
        });
    })

        // .transform((data) => {
        //     // This is where you mutate the data based on conditions
        //     formFields.forEach((field) => {
        //         if (field.conditionalLogic) {
        //             if (evaluateCondition(field, data)) {
        //                 // If the condition is satisfied, leave the field as is
        //                 // No need to modify the value
        //             } else {
        //                 // Mutate the data, setting the field to empty string or a default value
        //                 data[field.fieldId] = ""; // Mutate field value if condition fails
        //             }
        //         }
        //     });
        //     console.log(data)
        //     return data; // Return the mutated data
        // })
        ;
};


// Helper function to check if the value meets the minimum word count requirement
const checkMinWord = (value: string, minWords: number | undefined) => {
    if (minWords === undefined) return true; // No minimum word requirement
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= minWords; // Ensure word count is above or equal to the minimum
};

// Helper function to check if the value meets the maximum word count requirement
const checkMaxWord = (value: string, maxWords: number | undefined) => {
    if (maxWords === undefined) return true; // No maximum word requirement
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount <= maxWords; // Ensure word count is below or equal to the maximum
};
