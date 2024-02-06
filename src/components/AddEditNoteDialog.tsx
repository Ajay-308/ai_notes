import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";

interface AddEditNoteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }

export default function AddEditNoteDialog({
    open,
    setOpen,
  }: AddEditNoteDialogProps) {