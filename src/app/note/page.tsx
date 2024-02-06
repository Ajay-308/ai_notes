"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CreateArea from "./AddNotes";
import Note from "./Note";

const LOCAL_STORAGE_KEY = "notes";

export default function Page() {
  const [notes, setNotes] = useState<any[]>(() => {
    // Load notes from local storage on component mount
    const storedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  const addNotes = (newNote: any) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      // Save notes to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const handleDelete = (id: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((notesItem, index) => index !== id);
      // Save notes to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left side (Notes) */}
        <div className="w-[23rem] h-[25rem] gap-4 md:w-1/2 md:mt-4">
          {notes.map((noteItem: any, index: number) => (
            <Note
              key={index}
              title={noteItem.title}
              content={noteItem.note}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>

        {/* Right side (Create Area) */}
        <div className="flex-1 w-[23rem] h-[25rem] mt-4 md:mt-0 md:ml-48 sm:ml-48 order-first md:order-last">
          <CreateArea addNotes={addNotes} />
        </div>
      </div>
    </>
  );
}
