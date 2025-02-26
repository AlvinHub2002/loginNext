export interface FormSchema {
    formId: string;
    formTitle: string;
    description: string;
    formFields: FormField[];
}

export interface FormField {
    fieldId: string;
    fieldType: string;
    label: string;
    description: string;
    placeholder?: string;
    required: boolean;
    minWords?: number;
    maxWords?: number;
    options?: string[];
    fileTypes?: string[];
    maxFileSize?: number;
    conditionalLogic?: ConditionalLogic;
}

export interface ConditionalLogic {
    fieldId: string;
    value: string;
    operator: "equals" | "not_equals";
}