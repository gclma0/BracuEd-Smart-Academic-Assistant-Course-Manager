import { auth } from "@/auth";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh">
      <DashboardSidebar />
      <main className="py-6 px-4 sm:px-6 lg:px-8 flex-1">{children}</main>
    </div>
  );
}
