import { Skeleton } from "@/components/ui/skeleton";

export default function KeywordsFilterSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-2 mt-8">
      <div className="text-md font-medium text-primary/75 flex gap-2 items-center">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-32 h-5" />
      </div>

      <ul className="flex gap-3 flex-wrap justify-center md:justify-start">
        <li>
          <Skeleton className="w-16 h-8 rounded-full" />
        </li>
        <li>
          <Skeleton className="w-20 h-8 rounded-full" />
        </li>
        <li>
          <Skeleton className="w-18 h-8 rounded-full" />
        </li>
        <li>
          <Skeleton className="w-14 h-8 rounded-full" />
        </li>
        <li>
          <Skeleton className="w-22 h-8 rounded-full" />
        </li>
      </ul>
    </div>
  );
}
