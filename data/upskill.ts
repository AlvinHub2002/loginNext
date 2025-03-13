import { FormSchema } from "@/types/form-schema";

export const sampleFormData: FormSchema = {
    "formId": "upskill2025",
    "formTitle": "R10 Young Professionals UPSkill 2024 Proposal Form (Round 1)",
    "description": "",
    "formFields": [
        {
            "fieldId": "field_001",
            "fieldType": "Sub Heading",
            "label": "Project Lead Details",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_002",
            "fieldType": "Short Input Fields",
            "label": "Name",
            "description": "",
            "placeholder": "Enter your full name",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_003",
            "fieldType": "Email",
            "label": "Email address",
            "description": "",
            "placeholder": "Enter your email address",
            "required": true
        },
        {
            "fieldId": "field_004",
            "fieldType": "Short Input Fields",
            "label": "Contact number",
            "description": "",
            "placeholder": "Enter your contact number including country code",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_005",
            "fieldType": "Dropdown",
            "label": "IEEE Section",
            "description": "",
            "required": true,
            "options": [
                "Afghanistan Subsection",
                "Ananthapuramu Subsection",
                "Australian Capital Terr Section",
                "Bahawalpur Subsection",
                "Bangalore Section",
                "Bangladesh Section",
                "Beijing Section",
                "Bhubaneswar Subsection",
                "Bhutan Subsection",
                "Bombay Section",
                "Brunei Darussalam Subsection",
                "Busan Section",
                "Cambodia Subsection",
                "Chandigarh Subsection",
                "Chengdu Section",
                "Chongqing Subsection",
                "Daejeon Section",
                "Delhi Section",
                "Faisalabad Subsection",
                "Fiji Subsection",
                "Fukuoka Section",
                "Guangzhou Section",
                "Gujarat Section",
                "Guntur Subsection",
                "Guwahati Subsection",
                "Gwangju Section",
                "Harbin Section",
                "Hefei Subsection",
                "Hiroshima Section",
                "Hong Kong Section",
                "Hyderabad Section",
                "Indonesia Section",
                "Islamabad Section",
                "Kansai Section",
                "Karachi Section",
                "Kerala Section",
                "Kharagpur Section",
                "Kochi Subsection",
                "Kolkata Section",
                "Kuala Lumpur Subsection",
                "Lahore Section",
                "Macau Section",
                "Madhya Pradesh Section",
                "Madras Section",
                "Malabar Subsection",
                "Malaysia Section",
                "Mangalore Subsection",
                "Mongolia Subsection",
                "Myanmar Subsection",
                "Mysore Subsection",
                "Nagoya Section",
                "Nanjing Section",
                "Nepal Subsection",
                "New South Wales Section",
                "New Zealand Central Section",
                "New Zealand North Section",
                "New Zealand South Section",
                "North Karnataka Subsection",
                "Northern Australia Section",
                "Northern Territory Subsection",
                "Other",
                "Patna Subsection",
                "Peshawar Subsection",
                "Podhigai Subsection",
                "Pune Section",
                "Queensland Section",
                "Rajasthan Subsection",
                "Republic Of Philippines Section",
                "Roorkee Subsection",
                "Rourkela Subsection",
                "Sabah Subsection",
                "Sapporo Section",
                "Sarawak Subsection",
                "Sendai Section",
                "Seoul Section",
                "Shandong Subsection",
                "Shanghai Section",
                "Shikoku Section",
                "Shin-Etsu Section",
                "Silchar Subsection",
                "Singapore Section",
                "South Australia Section",
                "Sri Lanka Central Region Subsection",
                "Sri Lanka Section",
                "Sukkur Subsection",
                "Taegu Section",
                "Tainan Section",
                "Taipei Section",
                "Tasmania Subsection",
                "Thailand Section",
                "Tokyo Section",
                "Uttar Pradesh Section",
                "Victorian Section",
                "Vietnam Section",
                "Vizag Bay Section",
                "Western Australia Section",
                "Wuhan Section",
                "Xian Section",
                "Zhejiang Subsection"
            ]
        },
        {
            "fieldId": "field_006",
            "fieldType": "Short Input Fields",
            "label": "Affiliation: (if any)",
            "description": "",
            "placeholder": "",
            "required": false,
            "minWords": 0
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
            "fieldType": "Dropdown",
            "label": "Position",
            "description": "",
            "required": true,
            "options": [
                "Chair",
                "Vice-Chair",
                "Secretary",
                "Treasurer",
                "Other"
            ]
        },
        {
            "fieldId": "field_009",
            "fieldType": "Short Input Fields",
            "label": "YP Chair Name",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 0,
            "conditionalLogic": {
                "fieldId": "field_008",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_010",
            "fieldType": "Email",
            "label": "YP Chair Email",
            "description": "",
            "placeholder": "Enter your YP Chair's Email",
            "required": true,
            "conditionalLogic": {
                "fieldId": "field_008",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_011",
            "fieldType": "Dropdown",
            "label": "Mode of Activity",
            "description": "",
            "required": true,
            "options": [
                "Face to Face",
                "Hybrid"
            ]
        },
        {
            "fieldId": "field_012",
            "fieldType": "Sub Heading",
            "label": "Executive Summary",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_013",
            "fieldType": "Text area",
            "label": "Provide a brief overview of the proposed project (200 words maximum)",
            "description": "",
            "placeholder": "string",
            "required": true,
            "minWords": 5,
            "maxWords": 200
        },
        {
            "fieldId": "field_014",
            "fieldType": "Sub Heading",
            "label": "Project Justification",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_015",
            "fieldType": "Text area",
            "label": "Explain how the project addresses your Affinity Group’s or Council’s needs and its importance for your Section/Council (200 words maximum):",
            "description": "",
            "placeholder": "string",
            "required": true,
            "minWords": 5,
            "maxWords": 200
        },
        {
            "fieldId": "field_016",
            "fieldType": "Sub Heading",
            "label": "Program",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_017",
            "fieldType": "Multiple choice",
            "label": "Please select the themes for the program",
            "description": "",
            "required": true,
            "options": [
                "Code of Ethics for Engineers",
                "Leadership and Entrepreneurship",
                "Soft Skills",
                "Sustainable Development",
                "Engineer in Society",
                "Basic Management for Engineers",
                "Student to Young Professional Transition",
                "Other"
            ]
        },
        {
            "fieldId": "field_018",
            "fieldType": "Text area",
            "label": "Please indicate any other themes that will be included in the program",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 5,
            "maxWords": 200,
            "conditionalLogic": {
                "fieldId": "field_017",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_019",
            "fieldType": "Short Input Fields",
            "label": "Proposed timeline",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 0,
            "conditionalLogic": {
                "fieldId": "field_008",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_020",
            "fieldType": "Dynamic List",
            "label": "Tracks",
            "description": "Please provide the following details in each row.",
            "required": true,
            "dynamicList": [
                {
                    "field": "name",
                    "headerName": "Track Categories",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150,
                    "type": "singleSelect",
                    "valueOptions": [
                        { "label": "Talks/Keynotes", "value": "Talks/Keynotes" },
                        { "label": "Panel Discussions", "value": "Panel Discussions" },
                        { "label": "Workshops", "value": "Workshops" },
                        { "label": "Networking", "value": "Networking" },
                        { "label": "Hands-On Demonstrations", "value": "Hands-On Demonstrations" },
                        { "label": "Other Programs", "value": "Other Programs" }
                    ]
                },
                {
                    "field": "title",
                    "headerName": "Title",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150
                },
                {
                    "field": "objective",
                    "headerName": "Objective",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150
                },
                {
                    "field": "speakers",
                    "headerName": "Speakers",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150
                },
                {
                    "field": "collaborator",
                    "headerName": "Collaborator",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150
                },
                {
                    "field": "joinDate",
                    "headerName": "Event Date",
                    "type": "date",
                    "editable": true,
                    "flex": 1,
                    "minWidth": 150
                }
            ]
        },
        {
            "fieldId": "field_021",
            "fieldType": "Sub Heading",
            "label": "Metrics to measure its success",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_022",
            "fieldType": "Short Input Fields",
            "label": "Expected number of participants",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_023",
            "fieldType": "File upload",
            "label": "Budget",
            "description": "Please use the below table to present all the expected income (including the YP fund) and detailed expenses reflected on the number of expected attendees. Please draft the budget based on the R10 matching fund policy indicated in the Terms of References (hyperlink). Before submitting the proposal, it is advised to coordinate with the Section/Council/other funding sources regarding the remaining funding support required",
            "required": true,
            "fileTypes": [
                "jpg",
                "png",
                "pdf"
            ],
            "maxFileSize": 10
        }
    ]
}
