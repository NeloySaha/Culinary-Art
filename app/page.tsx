import AllRecipeSectionWrapper from "@/components/AllRecipeSectionWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PopularRecipeSectionWrapper from "@/components/PopularRecipeSectionWrapper";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <HeroSection />

      <Suspense fallback={<Spinner />}>
        <PopularRecipeSectionWrapper />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <AllRecipeSectionWrapper />
      </Suspense>

      <Footer />
    </div>
  );
}
