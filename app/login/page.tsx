"use client";

import { GalleryVerticalEnd } from "lucide-react"
import loginImage from "../../public/loginImage.png"
import { LoginForm } from "../../components/ui/login-form"
import Image from "next/image"


export default function LoginPage() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GEMS Forms
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center w-full h-screen bg-muted">
  <div className="relative w-[60%] max-w-lg h-[80%]">
    <Image
      src={loginImage}
      alt="Login Image"
      layout="fill"
      objectFit="contain" // Prevents stretching and cropping
      className="dark:brightness-[0.2] dark:grayscale rounded-lg" // Optional: Add rounded corners
    />
  </div>
</div>

    </div>
  )
}
