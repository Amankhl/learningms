import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { deleteSession, getUserFromServer } from "@/actions/profile";
import ProfileProvider from "@/context/ProfileProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "LMS",
  description: "LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const user = getUserFromServer();
  const logout = async () => {
    "use server";
    await deleteSession();
  };

  return (
    <html lang="en">
      <body
        className=' antialiased min-w-full'
      >
    <ProfileProvider user={user} logout={logout}>
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Navbar />
        <Breadcrumbs />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
    </ProfileProvider>
      </body>
    </html>
  );
}
