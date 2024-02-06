"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { Input } from "@/components/ui/input"; // Fixed import path
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

interface ChatMessage {
  user: string;
  jarwis: string;
}

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message: inputMessage },
        { withCredentials: true }
      );

      const newMessage: ChatMessage = {
        user: inputMessage,
        jarwis: response.data.message,
      };

      setChatHistory((prevHistory) => [...prevHistory, newMessage]);

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom when chatHistory changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`row justify-content-start pl-5`}>
              <div
                className="d-flex flex-column ml-auto rounded border bg-white p-2 text-black shadow"
                style={{
                  width: "fit-content",
                  minWidth: "8rem",
                  maxWidth: "20rem",
                }}
              >
                <div>
                  <strong className="m-1">user</strong>
                </div>
                <h4 className="m-1">{message.user}</h4>
              </div>
              <div className="row justify-content-end pl-5 text-blue-400">
                <div
                  className="d-flex flex-column bg-info w-rounded my-4 -ml-8 mr-auto border p-2 shadow"
                  style={{
                    width: "fit-content",
                    minWidth: "10rem",
                    maxWidth: "30rem",
                  }}
                >
                  <div className="text-blue-400">
                    <BotIcon className="m-1" size={20} />
                    <strong className="m-1">Jarwis</strong>
                  </div>
                  <h4 className="m-1 ">{message.jarwis}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="m-3 flex gap-1"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
