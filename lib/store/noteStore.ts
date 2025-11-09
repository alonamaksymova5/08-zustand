import { NewNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraft {
  draft: NewNote;
  setDraft: (newDraft: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteDraft>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (newDraft: NewNote) => set({ draft: newDraft }),
        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    { name: "draft", partialize: (state) => ({ draft: state.draft }) }
  )
);

console.log(useNoteStore.getState().draft);
