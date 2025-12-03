"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PopularRecipeCardSkeleton from "./PopularRecipeCardSkeleton";

export default function PopularRecipeSectionSkeleton() {
  // Array to simulate multiple skeleton cards
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="max-w-[280px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto my-8"
    >
      <CarouselContent className="-ml-1">
        {skeletonItems.map((item) => (
          <CarouselItem
            key={item}
            className="pl-1 md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
          >
            <div className="p-2">
              <PopularRecipeCardSkeleton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
