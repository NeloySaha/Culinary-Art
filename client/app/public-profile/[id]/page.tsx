import PublicProfile from "@/components/PublicProfile";
import PublicProfileSkeleton from "@/components/PublicProfileSkeleton";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense key={id} fallback={<PublicProfileSkeleton />}>
      <PublicProfile id={id} />
    </Suspense>
  );
}
