"use client";

import React, { useState } from "react";
import { sampleFormData } from "../../../data/upskill";
import { GalleryVerticalEnd } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"; // Import Drawer component from ShadCN

// Mock responses with IDs added
const sampleResponses: Record<string, any>[] = [
  {
    id: "response_001",
    field_002: "Jane Doe",
    field_003: "jane.doe@example.com",
    field_004: "+911234567890",
    field_005: "Section",
    field_007: "Delhi Section (India)",
    field_009: "XYZ Tech University",
    field_010: "12345678",
    field_011: "Chair",
    field_014: "Hybrid",
    field_016: "The proposed project aims to empower young professionals with skills in emerging technologies and soft skills through interactive sessions and real-world applications.",
    field_018: "This project addresses the skill gaps among YPs in our section and helps align their growth with IEEE's objectives of professional development and knowledge sharing.",
    field_020: [
      "Leadership and Entrepreneurship",
      "Soft Skills Development",
      "Emerging Technologies (AI, IoT, Blockchain, Cybersecurity, etc.)"
    ],
    field_022: "July 2025 - October 2025",
    field_023: [
      {
        field_024: "Workshops/Hands-on Demonstrations",
        field_025: "AI for Beginners",
        field_026: "Introduce the basics of Artificial Intelligence",
        field_027: "Dr. Ayesha Khan",
        field_028: "AI Learning Labs",
        field_029: "2025-08-15T10:00:00"
      },
      {
        field_024: "Panel Discussions",
        field_025: "Future of Tech Careers",
        field_026: "Discuss tech career paths in 2030 and beyond",
        field_027: "Panel of 5 industry experts",
        field_028: "Tech Professionals Network",
        field_029: "2025-09-10T14:30:00"
      }
    ],
    field_030: "Expected 100+ attendees, 10+ collaborators, post-event feedback above 4.5/5",
    field_031: "It will boost YP engagement, improve technical and leadership skills, and foster networking opportunities in the region.",
    field_032: [
      {
        field_033: "Corporate Sponsorship",
        field_034: "3000"
      },
      {
        field_033: "IEEE Section Funding",
        field_034: "2000"
      }
    ],
    field_035: "5000",
    field_036: [
      {
        field_037: "Venue Rental",
        field_038: "2",
        field_039: "500",
        field_040: "1000"
      },
      {
        field_037: "Speaker Honorarium",
        field_038: "5",
        field_039: "200",
        field_040: "1000"
      },
      {
        field_037: "Catering",
        field_038: "100",
        field_039: "15",
        field_040: "1500"
      },
      {
        field_037: "Marketing and Materials",
        field_038: "1",
        field_039: "500",
        field_040: "500"
      }
    ]
  }
];

const getFlatFieldIds = () => {
  const flatIds: string[] = [];

  sampleFormData.formFields.forEach((field) => {
    if (field.fieldType === "Sub Heading") return;

    const options = field.options as { fields?: any[] };

    if (
      (field.fieldType === "Dynamic List") &&
      options?.fields
    ) {
      options.fields.forEach((subField: any) => {
        flatIds.push(`${field.fieldId}.${subField.fieldId}`);
      });
    } else {
      flatIds.push(field.fieldId);
    }
  });

  return flatIds;
};

const getFieldLabel = (fieldId: string) => {
  const parts = fieldId.split(".");

  if (parts.length === 2) {
    const [parentId, childId] = parts;
    const parent = sampleFormData.formFields.find((f) => f.fieldId === parentId);
    const child = (parent?.options as { fields?: any[] })?.fields?.find(
      (sf: any) => sf.fieldId === childId
    );
    return child?.label || `${parent?.label || parentId} - ${childId}`;
  }

  const mainField = sampleFormData.formFields.find(
    (f) => f.fieldId === fieldId && f.fieldType !== "Sub Heading"
  );
  return mainField?.label || fieldId;
};

export default function ResponseTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<Record<
    string,
    any
  > | null>(null);

  const columnIds = getFlatFieldIds();

  const openDrawer = (response: Record<string, any>) => {
    setSelectedResponse(response);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedResponse(null);
  };

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10 h-screen  ">
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-center gap-2 md:justify-start mb-8">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GEMS Forms
          </a>
        </div>
        {/* Heading Section */}
        <div className="flex justify-center  pb-10">
          <h1 className="text-xl  font-bold">UpSkill2025 Form Responses</h1>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm w-full flex flex-col h-full">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[1000px]  text-sm text-left border-collapse rounded-lg">
            <thead className="sticky top-0 z-10 bg-muted text-muted-foreground rounded-t-lg">
              <tr>
                <th className="border-r border-b px-4 py-3 font-medium whitespace-nowrap sticky left-0 bg-white z-20 rounded-tl-lg">
                  Response ID
                </th>
                {columnIds.map((fieldId) => (
                  <th
                    key={fieldId}
                    className="border-r border-b px-4 py-3 font-medium whitespace-nowrap"
                  >
                    {getFieldLabel(fieldId)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleResponses.map((response, i) => {
                const flatData: Record<string, string | string[]> = {};

                for (const fieldId of columnIds) {
                  const [main, sub] = fieldId.split(".");

                  if (sub && Array.isArray(response[main])) {
                    flatData[fieldId] = response[main]
                      .map((item) => item[sub])
                      .join(", ");
                  } else {
                    flatData[fieldId] = Array.isArray(response[fieldId])
                      ? response[fieldId].join(", ")
                      : response[fieldId] ?? "";
                  }
                }

                return (
                  <tr key={i} className="hover:bg-muted/40 border-b">
                    <td className="px-4 py-3 whitespace-nowrap sticky left-0 bg-white z-10 border-r rounded-l-lg">
                      <div className="flex items-center gap-2">
                        <span>{response.id}</span>
                        <button
                          className="hover:text-black-800"
                          onClick={() => openDrawer(response)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-maximize2-icon lucide-maximize-2"
                          >
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" x2="14" y1="3" y2="10" />
                            <line x1="3" x2="10" y1="21" y2="14" />
                          </svg>
                        </button>
                      </div>
                    </td>

                    {columnIds.map((fieldId) => {
                      const val = flatData[fieldId];

                      if (
                        val === "Completed" ||
                        val === "Male" ||
                        val === "Yes"
                      ) {
                        return (
                          <td
                            key={fieldId}
                            className={`px-4 py-3 whitespace-nowrap  rounded-md`}
                          >
                            <Badge variant="outline">{val}</Badge>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={fieldId}
                          className="px-4 py-3 whitespace-nowrap max-w-[250px] overflow-hidden text-ellipsis truncate rounded-md"
                          title={typeof val === 'string' ? val : undefined}
                        >
                          {val}
                        </td>

                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer component from ShadCN */}
      {isDrawerOpen && selectedResponse && (
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-xl">Response Details</DrawerTitle>
            </DrawerHeader>

            <div className="px-6 pb-6 space-y-4">
              {Object.entries(selectedResponse).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-muted/30 rounded-lg p-4 shadow-sm flex flex-col gap-1"
                >
                  <span className="font-semibold text-sm text-muted-foreground">
                    {getFieldLabel(key)}
                  </span>
                  <span className="text-sm whitespace-pre-wrap break-words">
                    {Array.isArray(value)
                      ? value
                        .map((item) =>
                          typeof item === "object"
                            ? Object.values(item).join(", ")
                            : item
                        )
                        .join(", ")
                      : value}
                  </span>
                </div>
              ))}
            </div>

            <DrawerFooter>
              <DrawerClose className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
