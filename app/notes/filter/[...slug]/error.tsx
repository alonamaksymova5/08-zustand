"use client";

import css from "./Error.module.css";

export default function Error({ error }: { error: Error }) {
  return <p className={css.text}>Something went wrong {error.message}</p>;
}
