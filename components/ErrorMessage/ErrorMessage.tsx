import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.text}>Failed to load notes. Try again</p>
    </div>
  );
}
