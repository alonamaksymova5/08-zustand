import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (search: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query);
  };

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={handleChange}
      />
    </div>
  );
}
