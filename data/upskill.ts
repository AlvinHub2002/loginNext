import { FormSchema } from "@/types/form-schema";

export const sampleFormData: FormSchema = {
    "formId": "upskill2025",
    "formTitle": "R10 Young Professionals UPSkill 2025 Proposal Form (Round 1)",
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
            "label": "IEEE Organization Type",
            "description": "",
            "required": true,
            "options": ["Sub Section", "Section", "Council"]
        },
        {
            "fieldId": "field_006",
            "fieldType": "Dropdown",
            "label": "IEEE Sub Section",
            "description": "",
            "required": true,
            "options": [
                "Shandong", "Chandigarh", "Guntur", "Peshawar", "Kochi", "Malabar", "Podhigai",
                "Hefei", "Zhejiang", "Honam", "Sri Lanka Central", "Roorkee", "Tasmania",
                "Brunei Darussalam", "Mangalore", "Nepal (elevated to Section in 2024)",
                "Rajasthan", "Bhubaneswar", "Fiji", "Afghanistan Subsection", "Anathapuramu Subsection",
                "Bahawalpur Subsection", "Sarawak Subsection", "Nagpur", "Cambodia", "Myanmar",
                "Sabah", "Bhutan", "Mongolia", "Patna", "Northern Territory", "Chongqing", "Faisalabad",
                "Quetta Subsection", "Laos Subsection", "North Karnataka", "Rourkela Subsection",
                "Mysore Subsection", "Kuala Lumpur Subsection", "Silchar Subsection", "Guwahati Subsection",
                "Sukkur Subsection", "Maldives Subsection"
            ],
            "conditionalLogic": {
                "fieldId": "field_005",
                "value": "Sub Section",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_007",
            "fieldType": "Dropdown",
            "label": "IEEE Section",
            "description": "",
            "required": true,
            "options": [
                "Beijing", "Delhi", "Hyderabad", "Islamabad", "Kerala", "Madras", "Nanjing",
                "Seoul", "Sri Lanka", "Uttar Pradesh", "Victorian", "Region 10", "Bangalore",
                "Kolkata", "Lahore", "Bombay", "Malaysia", "Northern Australia", "Karachi", "Kolkata Section"
            ],
            "conditionalLogic": {
                "fieldId": "field_005",
                "value": "Section",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_008",
            "fieldType": "Dropdown",
            "label": "IEEE Council",
            "description": "",
            "required": true,
            "options": [
                "Australia Council", "China Council", "India Council", "Japan Council",
                "Korea Council", "New Zealand Council", "Southeast Asia Council"
            ],
            "conditionalLogic": {
                "fieldId": "field_005",
                "value": "Council",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_009",
            "fieldType": "Short Input Fields",
            "label": "Affiliation: (if any)",
            "description": "",
            "placeholder": "",
            "required": false,
            "minWords": 0
        },
        {
            "fieldId": "field_010",
            "fieldType": "Short Input Fields",
            "label": "IEEE Member ID",
            "description": "",
            "placeholder": "Enter your IEEE membership ID",
            "required": true
        },
        {
            "fieldId": "field_011",
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
            "fieldId": "field_012",
            "fieldType": "Short Input Fields",
            "label": "YP Chair Name (Section/ Council)",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 0,
            "conditionalLogic": {
                "fieldId": "field_011",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_013",
            "fieldType": "Email",
            "label": "YP Chair Email (Section/ Council)",
            "description": "",
            "placeholder": "Enter your YP Chair's Email",
            "required": true,
            "conditionalLogic": {
                "fieldId": "field_011",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_014",
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
            "fieldId": "field_015",
            "fieldType": "Sub Heading",
            "label": "Executive Summary",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_016",
            "fieldType": "Text area",
            "label": "Provide a brief overview of the proposed project (200 words maximum)",
            "description": "",
            "placeholder": "string",
            "required": true,
            "minWords": 5,
            "maxWords": 200
        },
        {
            "fieldId": "field_017",
            "fieldType": "Sub Heading",
            "label": "Project Justification",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_018",
            "fieldType": "Text area",
            "label": "Explain how the project addresses your Affinity Group's or Council's needs and its importance for your Section/Council (200 words maximum):",
            "description": "",
            "placeholder": "string",
            "required": true,
            "minWords": 5,
            "maxWords": 200
        },
        {
            "fieldId": "field_019",
            "fieldType": "Sub Heading",
            "label": "Program",
            "description": "",
            "required": false
        },
        {
            "fieldId": "field_020",
            "fieldType": "Multiple choice",
            "label": "Please select the themes for the program",
            "description": "",
            "required": true,
            "options": [
                "Code of Ethics for Engineers",
                "Leadership and Entrepreneurship",
                "Soft Skills Development",
                "Emerging Technologies (AI, IoT, Blockchain, Cybersecurity, etc.)",
                "Sustainable Development & Green Technologies",
                "Engineers in Society & Ethical Responsibilities",
                "Basic Management for Engineers",
                "Students to Young Professionals Transition",
                "Innovation & Design Thinking",
                "Project & Risk Management",
                "Cybersecurity & Privacy",
                "Workplace Diversity & Inclusion",
                "Other"
            ]
        },
        {
            "fieldId": "field_021",
            "fieldType": "Text area",
            "label": "Please indicate any other themes that will be included in the program",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 5,
            "maxWords": 200,
            "conditionalLogic": {
                "fieldId": "field_020",
                "value": "Other",
                "operator": "equals"
            }
        },
        {
            "fieldId": "field_022",
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
            "fieldId": "field_023",
            "fieldType": "Dynamic List",
            "label": "Tracks",
            "description": "Please provide the following details in each row.",
            "required": true,
            "dataGrid": [
                {
                    "fieldId": "field_024",
                    "fieldType": "Dropdown",
                    "label": "Track Categories",
                    "description": "",
                    "required": true,
                    "options": [
                        "Talks/Keynotes",
                        "Workshops/Hands-on Demonstrations",
                        "Networking Sessions",
                        "Mentoring Session",
                        "Panel Discussions",
                        "Other Programs"
                    ]
                },
                {
                    "fieldId": "field_025",
                    "fieldType": "Short Input Fields",
                    "label": "Title",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_026",
                    "fieldType": "Short Input Fields",
                    "label": "Objective",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_027",
                    "fieldType": "Short Input Fields",
                    "label": "Speakers",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_028",
                    "fieldType": "Short Input Fields",
                    "label": "Collaborator",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_029",
                    "fieldType": "Time picker",
                    "label": "Event Date",
                    "description": "When should we contact you?",
                    "placeholder": "HH:MM",
                    "required": true
                }
            ]
        },
        {
            "fieldId": "field_030",
            "fieldType": "Short Input Fields",
            "label": "Metrics to measure its success",
            "description": "Number of YP members, participants, and collaborators",
            "placeholder": "",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_031",
            "fieldType": "Text area",
            "label": "Impact",
            "description": "A description of how the planned activity can benefit the professional development of YP members",
            "placeholder": "",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_032",
            "fieldType": "Dynamic List",
            "label": "Expected Income",
            "description": "",
            "required": true,
            "dataGrid": [
                {
                    "fieldId": "field_033",
                    "fieldType": "Short Input Fields",
                    "label": "Income Source Name",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_034",
                    "fieldType": "Short Input Fields",
                    "label": "Source Income",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                }
            ]
        },
        {
            "fieldId": "field_035",
            "fieldType": "Short Input Fields",
            "label": "Total Expected Income (USD)",
            "description": "",
            "placeholder": "",
            "required": true,
            "minWords": 0
        },
        {
            "fieldId": "field_036",
            "fieldType": "Dynamic List",
            "label": "Expected Expenses",
            "description": "",
            "required": true,
            "dataGrid": [
                {
                    "fieldId": "field_037",
                    "fieldType": "Short Input Fields",
                    "label": "Item Name/Description",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_038",
                    "fieldType": "Short Input Fields",
                    "label": "Quantity",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_039",
                    "fieldType": "Short Input Fields",
                    "label": "Unit Price",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                },
                {
                    "fieldId": "field_040",
                    "fieldType": "Short Input Fields",
                    "label": "Total Price",
                    "description": "",
                    "placeholder": "",
                    "required": true,
                    "minWords": 0
                }
            ]
        }
    ]
}
