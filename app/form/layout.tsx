import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Upskill 2025",
  description: "GEMS Form Builder Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
