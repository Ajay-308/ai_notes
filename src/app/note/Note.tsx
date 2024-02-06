import React from "react";
import { Button } from "@/components/ui/button";

interface NoteItem {
  title: string;
  content: string;
  onDelete: () => void;
}

const Note: React.FC<NoteItem> = ({ title, content, onDelete }) => {
  return (
    <div className="max-w-sm flex-wrap flex flex-row mx-auto">
      <div className="bg-white rounded shadow-md p-4 mb-4">
        <div className="flex w-[15rem] h-[3rem] felx-row justify-between items-center mb-2">
          <h1 className="text-2xl text-black font-bold">{title}</h1>
          <Button
            className="text-red-500 bg-blue-800 hover:text-red-700"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
        <p className="text-blue-400 font-bold">{content}</p>
      </div>
    </div>
  );
};

export default Note;
