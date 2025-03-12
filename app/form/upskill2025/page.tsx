import { SampleForm } from "@/components/home/sample-form";
import { sampleFormData } from "@/data/upskill";
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center my-8">
      <Head>
        <title>Upskill 2025</title>
      </Head>
      <SampleForm formData={sampleFormData} />
    </div>
  );
}
