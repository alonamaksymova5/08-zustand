import css from "./LayoutNotes.module.css";

type LayoutNotesProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function LayoutNotes({ sidebar, children }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
