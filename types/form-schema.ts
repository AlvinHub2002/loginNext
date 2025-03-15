// import { GridColDef } from "@mui/x-data-grid";

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
  | "Dynamic List"
  | "Sub Heading";
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  minWords?: number;
  maxWords?: number;
  options?: string[];
  fileTypes?: string[];
  maxFileSize?: number;
  conditionalLogic?: ConditionalLogic;
  dataGrid?: DataGridColumn[];
  // DataGrid?: GridColDef[];
}

export interface DataGridColumn {
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
  | "Time picker";
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  minWords?: number;
  maxWords?: number;
}

export interface ConditionalLogic {
  fieldId: string;
  value: string;
  operator: "equals" | "not_equals";
}
