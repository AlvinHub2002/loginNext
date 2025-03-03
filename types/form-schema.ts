export interface FormSchema {
  formId: string;
  formTitle: string;
  description: string;
  formFields: FormField[];
}

export interface FormField {
  fieldId: string;
  fieldType:
    | "Short Input Fields"
    | "IEEE Member ID"
    | "Email"
    | "Text area"
    | "Radio"
    | "Multiple choice"
    | "File upload"
    | "Dropdown"
    | "Date Picker"
    | "Time picker"
    | "Dynamic List";
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
  dynamicList?: unknown;
}

export interface DynamicListColumn {
  columnId: string;
  fieldType:
    | "Short Input Fields"
    | "IEEE Member ID"
    | "Email"
    | "Text area"
    | "Radio"
    | "Multiple choice"
    | "File upload"
    | "Dropdown"
    | "Date Picker"
    | "Time picker";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ConditionalLogic {
  fieldId: string;
  value: string;
  operator: "equals" | "not_equals";
}
