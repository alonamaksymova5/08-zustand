"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
}

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
}; //чи це тут треба?

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [form, setForm] = useState(initialDraft);

  useEffect(() => {
    if (pathname === "/notes/action/create") {
      if (draft) {
        setForm(draft);
      } else {
        setForm(initialDraft);
      }
    }
  }, [pathname, draft]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setDraft(updated);
    console.log("📝 Draft updated:", updated);
  };

  async function handleCreateNote(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await createNote({ title, content, tag });

    queryClient.invalidateQueries({ queryKey: ["notes"] });
    clearDraft();
    router.back();

    if (onClose) onClose();
  }

  const handleCancel = () => {
    router.back();
    if (onClose) onClose();
  };

  return (
    <form action={handleCreateNote} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          maxLength={500}
          className={css.textarea}
          value={form.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          required
          className={css.select}
          value={form.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        {onClose && (
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
