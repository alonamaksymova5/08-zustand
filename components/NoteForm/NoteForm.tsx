import { useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  async function handleCreateNote(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag");

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await createNote({ title, content, tag: tag as NoteTag });

    queryClient.invalidateQueries({ queryKey: ["notes"] });

    if (onClose) onClose();
  }

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
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          maxLength={500}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          required
          defaultValue="Todo"
          className={css.select}
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
          <button type="button" className={css.cancelButton} onClick={onClose}>
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
