"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import ModalPreview from "./ModalPreview";
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;
  if (!note) return null;

  return (
    <ModalPreview onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button className={css.backBtn} onClick={() => router.back()}>
            Go back
          </button>
        </div>
      </div>
    </ModalPreview>
  );
}
