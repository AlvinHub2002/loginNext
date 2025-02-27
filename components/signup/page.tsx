"use client";

import { GalleryVerticalEnd } from "lucide-react";
import loginImage from "../../public/loginImage.png";
import Image from "next/image";
import { SignupForm } from "../ui/signup-form";
import { useEffect } from "react";

export default function SignupPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <div
            className="grid h-screen w-full lg:grid-cols-2"
            style={{ overflow: 'hidden' }}
        >
            <div className="flex flex-col justify-center gap-6 px-6 md:px-12">
                <div className="flex justify-center md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        IEEE
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <SignupForm />
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center bg-muted">
                <div className="relative w-[55%] max-w-md h-[70%]" style={{overflow: 'hidden'}}>
                    <Image
                        src={loginImage}
                        alt="Signup Image"
                        layout="fill"
                        objectFit="contain"
                        className="dark:brightness-[0.2] dark:grayscale rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}