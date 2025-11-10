import { Metadata } from "next";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { ALL_NOTES } from "@/lib/constants";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || ALL_NOTES;

  const title = tag === ALL_NOTES ? "All Notes" : `Your notes about ${tag}`;
  const description =
    tag === ALL_NOTES
      ? "Browse all notes."
      : `Browse notes filtered be the "${tag}."`;

  return {
    title: title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-eosin-kappa.vercel.app/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || ALL_NOTES;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, 12, "", tag === ALL_NOTES ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
