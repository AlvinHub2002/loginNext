export interface MyFormField{
  name:string;
  label:string;
  type: string;
  required?:boolean;
  options?:string[];
  helperText?:string;
  dependsOn?: string;
  showIf?: any;
}

export const formFields: MyFormField[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    helperText: "Enter your username (at least 2 characters).",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    helperText: "Provide a valid email address.",
  },
  {
    name: "isMember",
    label: "Are you an IEEE Member ?",
    type: "select",
    options: ["yes", "no"],
    required: true,
    helperText: "Select Yes/No.",
  },
  {
    name: "ieeeId",
    label: "IEEE ID",
    type: "text",
    helperText: "Enter your IEEE ID .",
    dependsOn: "isMember",
    showIf: "yes",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    helperText: "Write a short bio about yourself (10-160 characters).",
  },
 
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    helperText: "Select your gender.",
  },
  {
    name: "hobbies",
    label: "Hobbies",
    type: "multiselect",
    options: ["Reading", "Sports", "Music", "Traveling"],
    helperText: "Choose at least one hobby.",
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    helperText: "Pick your date of birth.",
  },

  {
    name: "time",
    label: "Preferred Time",
    type: "time",
    helperText: "Select your preferred time.",
  },

]

  