import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LMS",
  description: "LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=' antialiased min-w-full'
      >
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Navbar />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}
