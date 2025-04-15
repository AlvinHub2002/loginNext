"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { generateFormSchema } from "@/lib/generate-form-schema";
import { FormSchema, FormField } from "@/types/form-schema";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader"
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import FormElementsHandler from "./FormInputField";
import { usePathname } from 'next/navigation'
import { fileUpload } from "@/lib/fileUpload";
// import { zodToJsonSchema } from "zod-to-json-schema";
// import { DevTool } from "@hookform/devtools";
interface FormProps {
    formData: FormSchema;
}

export function FormsCreator({ formData }: FormProps) {
    const router = useRouter();
    const pathname = usePathname()
    const [formSchema, setFormSchema] = useState(generateFormSchema(formData.formFields));
    const [loader, setLoader] = useState(false);

    function getDefault() {
        const res = formData.formFields.reduce((acc, field) => {
            if (field.fieldType !== "Sub Heading")
                acc[field.fieldId] = field.fieldType === "Multiple choice" || field.fieldType === "Dynamic List" ? [] : "";
            return acc;
        }, {} as Record<string, "" | never[]>)
        // console.log(res)
        return res;
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: getDefault(),
    });

    const { handleSubmit } = form;

    // rerenderCount++;

    useEffect(() => {

        (async function () {
            try {
                await axios.get("/api/check-tokens", {
                    withCredentials: true
                })
            } catch (e) {
                console.error(e);
                // router.push(`/login?next=${pathname}`);
            }
        })();

    }, [router, pathname])

    // Output the schema description

    useEffect(() => {
        const newSchema = generateFormSchema(formData.formFields);
        // console.log(newSchema)
        setFormSchema(newSchema);
    }, [formData.formFields]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (!loader) {
            const DataToSend: any = [];
            const fileIndexes = Object.keys(data);
            const fileUploadIndexes = formData.formFields.filter((value: FormField) => value.fieldType === "File upload");

            console.log(fileUploadIndexes)
            try {


                setLoader(true);
                for (const response of fileIndexes) {
                    if (fileUploadIndexes.some((field: FormField) => field.fieldId === response)) {
                        if (data[response] !== "" && data[response] !== null) {
                            console.log(data[response])
                            const images = await fileUpload(data[response]); // Await the upload before moving on
                            DataToSend.push({ field_id: response, response: images.map(file => file.url) });
                        }
                    } else {
                        DataToSend.push({ field_id: response, response: data[response] });
                    }
                }

                console.log(DataToSend)
                await axios.post(`/api/v1/forms/${formData.formId}/responses`, { formId: formData.formId, responses: DataToSend }, {
                    withCredentials: true
                })
                toast.success('Respose submitted');
                router.push("/submitted");
                setLoader(false);
            } catch (err) {
                setLoader(false);
                console.log(err)
                toast.error('Respose failed');
            }
        }
    }
    // console.log(form.formState.defaultValues);
    // console.log(form.formState.errors);
    return (<>


        <Form  {...form} >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-10 w-full max-w-4xl mx-auto bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">{formData.formTitle}</h2>
                <p className="text-center mb-4 text-gray-600">{formData.description}</p>

                {formData.formFields.map((field, index) => {
                    return <FormElementsHandler key={index} form={form} field={field} />

                })}
                <div className="flex justify-end">
                    <Button type="submit" className="w-auto">
                        {loader ? <Loader /> : "Submit"}
                    </Button>
                </div>
            </form>

        </Form>
        {/* <DevTool control={form.control} /> set up the dev tool */}
    </>
    );
}
