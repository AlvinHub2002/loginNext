import { SampleForm } from "@/components/home/sample-form";
import LoginPage from "@/app/login/page";
import { sampleFormData } from "@/data/form-data";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center my-8">
      {/* <SampleForm formData={sampleFormData} /> */}
      <LoginPage/>
      {/* <SignupPage/> */}
    </div>
  );
}
