import React from "react";
import { cn } from "@/lib/utils";
import SideBarComponent from '@/components/SideBarComponent'
import Settings from '@/components/Settings'

export default function SettingsPage() {

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 h-screen overflow-hidden")}>
      <SideBarComponent/>

      <Settings/>
    </div>
  );
}