import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const monoSans = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sundram Kumar | Portfolio",
  description:
    "Premium, animated developer portfolio showcasing skills, projects, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceSans.variable} ${monoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
