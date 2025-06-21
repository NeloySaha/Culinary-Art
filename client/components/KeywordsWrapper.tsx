import KeywordsFilter from "./KeywordsFilter";

export default async function KeywordsWrapper() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/keywords`,
    {
      next: {
        revalidate: 3600 * 24,
      },
    }
  );
  const data = await res.json();

  if (!data.success) return null;

  return <KeywordsFilter keywords={data.data} />;
}
