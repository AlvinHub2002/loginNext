import { FormSchema } from "@/types/form-schema";

export const ypAffinity2025: FormSchema = {
    "formId": "ypAffinity2025",
    "formTitle": "R10 Young Professionals Outstanding Section Affinity Group 2025",
    "description": "",
    "formFields":[
        {
            "fieldId": "field_001",
            "fieldType": "Dropdown",
            "label": "Affinity Group Information",
            "description": "",
            "required": true,
            "options": [
                "Australian Capital Terr Section",
                "Bangalore Section",
                "Bangladesh Section",
                "Beijing Section",
                "Bombay Section",
                "Chengdu Section",
                "Delhi Section",
                "Gujarat Section",
                "Gwangju Section",
                "Hong Kong Section",
                "Hyderabad Section",
                "Indonesia Section",
                "Islamabad Section",
                "Kansai Section",
                "Karachi Section",
                "Kerala Section",
                "Kharagpur Section",
                "Kolkata Section",
                "Lahore Section",
                "Madras Section",
                "Malaysia Section",
                "Nagoya Section",
                "New South Wales Section",
                "New Zealand Central Section",
                "New Zealand South Section",
                "Northern Australia Section",
                "Pune Section",
                "Queensland Section",
                "Republic Of Philippines Section",
                "Sapporo Section",
                "Sendai Section",
                "Seoul Section",
                "Shanghai Section",
                "Singapore Section",
                "South Australia Section",
                "Sri Lanka Section",
                "Tainan Section",
                "Taipei Section",
                "Thailand Section",
                "Tokyo Section",
                "Uttar Pradesh Section",
                "Victorian Section",
                "Vietnam Section",
                "Western Australia Section"
            ]
        },
        {
            "fieldId": "field_002",
            "fieldType": "Sub Heading",
            "label": "Nominee Information",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_003",
            "fieldType": "Short Input Fields",
            "label": "Name",
            "description": "",
            "placeholder": "Enter your full name",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_004",
            "fieldType": "Email",
            "label": "Email address",
            "description": "",
            "placeholder": "Enter your email address",
            "required": true
        },
        {
            "fieldId": "field_005",
            "fieldType": "Short Input Fields",
            "label": "Contact number",
            "description": "",
            "placeholder": "Enter your contact number including country code",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_006",
            "fieldType": "Dropdown",
            "label": "Position",
            "description": "",
            "required": true,
            "options": [
                "Chair",
                "Vice-Chair",
                "Secretary",
                "Treasurer"
            ]
        },
        {
            "fieldId": "field_007",
            "fieldType": "Short Input Fields",
            "label": "IEEE Member ID",
            "description": "",
            "placeholder": "Enter your IEEE membership ID",
            "required": true
        },
        {
            "fieldId": "field_008",
            "fieldType": "Sub Heading",
            "label": "Impact of Activities",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_009",
            "fieldType": "Text area",
            "label": "Q1. List and describe the key activities organized by your Affinity Group in the past year. How have these activities impacted your members and the community?",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_010",
            "fieldType": "Sub Heading",
            "label": "Alignment with IEEE Mission",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_011",
            "fieldType": "Text area",
            "label": "Q2. How do your Affinity Group's activities align with IEEE's mission and the objectives of Region 10? Provide examples.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_012",
            "fieldType": "Sub Heading",
            "label": "Innovation and Creativity",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_013",
            "fieldType": "Text area",
            "label": "Q3. Describe any innovative or creative approaches your Affinity Group has employed in engaging members, organizing events, or addressing community needs.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_014",
            "fieldType": "Sub Heading",
            "label": "Membership Growth",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_015",
            "fieldType": "Text area",
            "label": "Q4. Provide details on membership growth. How has your Affinity Group attracted and retained members? Including current and previous year statistics details and also explain any strategies or initiatives that helped.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_016",
            "fieldType": "Sub Heading",
            "label": "Collaboration and Partnerships",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_017",
            "fieldType": "Text area",
            "label": "Q5. List any collaborations or partnerships your Affinity Group has established with other IEEE entities, industry, academia, or community organizations. Describe the nature and outcome of these partnerships.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_018",
            "fieldType": "Sub Heading",
            "label": "Sustainability and Legacy",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_019",
            "fieldType": "Text area",
            "label": "Q6. What measures has your Affinity Group taken to ensure its activities are sustainable and leave a lasting impact? Discuss any succession planning or legacy projects.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_020",
            "fieldType": "Sub Heading",
            "label": "Additional Achievements",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_021",
            "fieldType": "Text area",
            "label": "Q7. Provide any additional information that supports your nomination for the R10 Young Professionals Outstanding Section Affinity Group Award.",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_022",
            "fieldType": "Sub Heading",
            "label": "Social Links",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_023",
            "fieldType": "Text area",
            "label": "Provide links to access Affinity Group’s Website/Social Media Pages",
            "description": "",
            "placeholder": "string",
            "required": true
        },
        {
            "fieldId": "field_024",
            "fieldType": "Sub Heading",
            "label": "Photo",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_025",
            "fieldType": "File upload",
            "label": "Upload Formal group picture of the nominated AG",
            "description": "Allowed file formats: .png, .jpg, .jpeg, Max size : 1MB",
            "required": true,
            "fileTypes": ["png", "jpg", "jpeg"],
            "maxFileSize": 1
        }
    ]
};
