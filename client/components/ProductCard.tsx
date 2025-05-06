"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Product } from "@/lib/types";
import { Separator } from "./ui/separator";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simulate adding to cart
  };

  return (
    <Link href={`/shop/product/${product._id}`}>
      <Card className="flex flex-col gap-1 group h-full">
        <CardHeader className="relative">
          <Badge className="absolute top-2 right-8 z-10 bg-amber-300 text-foreground rounded-full">
            {product.category}
          </Badge>

          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.imageUrl}
              alt="food"
              className="object-cover w-full h-56  group-hover:scale-105 transition-all duration-300"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 mt-auto items-start">
          <div className="font-semibold place-self-end">
            &#2547; {product.price.toLocaleString("en-US")}
            <span className="text-xs text-muted-foreground ml-1">
              / {product.unit}
            </span>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.quantityInStock <= 0}
              className="w-full"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to cart</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
