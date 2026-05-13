import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AI Internship Detector | Stop Fake Internship Scams",
  description:
    "AI-powered platform that detects fake internships, phishing recruiter emails, and scam job offers in seconds. Protect yourself with real-time cybersecurity-grade analysis.",
  keywords: [
    "fake internship detector",
    "internship scam",
    "AI job analyzer",
    "phishing email detection",
    "student safety",
    "recruiter scam",
  ],
  openGraph: {
    title: "AI Internship Detector",
    description: "Detect fake internships with AI-powered cybersecurity analysis.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Internship Detector",
    description: "AI-powered scam detection for students and job seekers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
