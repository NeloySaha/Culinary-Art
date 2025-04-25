import Spinner from "@/components/Spinner";
import UserInfo from "@/components/UserInfo";
import UserPosts from "@/components/UserPosts";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto">
      <Suspense fallback={<Spinner />}>
        <UserInfo />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <UserPosts />
      </Suspense>
    </div>
  );
}
