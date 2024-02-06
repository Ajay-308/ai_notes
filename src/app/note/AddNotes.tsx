"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

import { Textarea } from "../../components/ui/textarea";
interface CreateAreaProps {
  addNotes: (newNote: { title: string; note: string }) => void;
}

export default function CreateArea({ addNotes }: CreateAreaProps) {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, note);
    addNotes({ title, note });
    setTitle("");
    setNote("");
  };

  return (
    <form className="rounded shadow-xl w-96 p-4" onSubmit={submit}>
      <Input
        onChange={handleChange}
        value={title}
        className="w-full border-none p-1 outline-none resize-none"
        type="text"
        placeholder="Title"
      />
      <Textarea
        onChange={handleChange1}
        value={note}
        className="w-full mt-8 border-none p-1 outline-none resize"
        type="text"
        placeholder="Take a note..."
      />
      <Button className="mt-8" type="submit">
        Create Note
      </Button>
    </form>
  );
}
