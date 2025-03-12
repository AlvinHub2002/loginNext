'use server'

import { SampleForm } from "@/components/home/sample-form";
// import LoginPage from "@/app/login/page";
import { sampleFormData } from "@/data/form-data";
import Head from 'next/head'

export default async function Home() {
  return (
    <div className="min-h-screen flex justify-center my-8">
      <Head>
        <title>Upskill 2025</title>
      </Head>
      <SampleForm formData={sampleFormData} />

    </div>
  );
}
