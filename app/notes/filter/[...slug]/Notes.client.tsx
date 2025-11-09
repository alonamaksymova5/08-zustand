"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "@/lib/api";
import css from "./NotesClient.module.css";
import Link from "next/link";

const PER_PAGE = 9;

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const debounced = useDebouncedCallback((search: string) => {
    setSearch(search.trim());
    setCurrentPage(1);
  }, 300);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, search, tag],
    queryFn: () => fetchNotes(currentPage, PER_PAGE, search, tag),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const notes = data?.notes || [];

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debounced} />
        {totalPages > 1 && (
          <Pagination
            onPageChange={handlePageClick}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : isSuccess ? (
        notes.length > 0 && <NoteList notes={notes} />
      ) : (
        <p>No note founds</p>
      )}
    </div>
  );
}
