"use client";

import AIChatButton from "@/components/AIcharButton";

import ThemeToggleButton from "@/components/ToggleThemeButton";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreateArea from "./AddNotes";
import { set } from "react-hook-form";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            <span className="font-bold">Shera AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <ThemeToggleButton />
            {/* <Button onClick={() => setShowAddEditNoteDialog(true)}>
              Add Note
            </Button> */}
            <AIChatButton />
          </div>
        </div>
      </div>
      {/* <CreateArea
        addNotes={addNotes}
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      /> */}
    </>
  );
}
