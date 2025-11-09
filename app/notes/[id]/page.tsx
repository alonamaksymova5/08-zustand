import { Metadata } from "next";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsPageClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = params;

  const note = await fetchNoteById(id);

  const title = note.title ? `Note: ${note.title}` : `Note ${id}`;
  const description = note.content
    ? note.content.slice(0, 100)
    : `You are viewing note ${id}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://your-vercel-url.vercel.app/",
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsPageClient id={id} />
    </HydrationBoundary>
  );
}
