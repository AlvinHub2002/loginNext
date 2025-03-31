
import { ypVolunteer2025 } from "@/data/ypvolunteer2025";
import { FormsCreator } from "@/components/home/FormsCreator";
import type { Metadata } from "next";
import Head from 'next/head'

export const metadata: Metadata = {
  title: "YP Awards 2025",
  description: "GEMS Form Builder Application",
};


export default function Home() {


  return (
    <div className="min-h-screen flex justify-center py-8 bg-gradient-to-r from-slate-50 to-slate-200">
      <Head>
        <title>YP Awards 2025</title>
      </Head>

        {/* <SampleForm formData={sampleFormData} /> */}
        <FormsCreator formData={ypVolunteer2025} />

    </div>
  );
}
