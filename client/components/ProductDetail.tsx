"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      //   toast({
      //     title: "Added to cart",
      //     description: `${quantity} × ${product?.name} has been added to your cart.`,
      //   });
    }, 600);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.quantityInStock) {
      setQuantity(quantity + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-muted rounded mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-24 bg-muted rounded w-full"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="w-full">
      <Link
        href="/shop"
        className="inline-flex items-center text-sm text-muted-foreground mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full rounded-lg"
          />

          {product.quantityInStock <= 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 text-2xl font-semibold">
              &#2547; {product.price.toLocaleString("en-US")}
              <span className="text-sm text-muted-foreground ml-1">
                / {product.unit}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Availability</h2>
            <p className="text-muted-foreground">
              {product.quantityInStock > 0
                ? `${product.quantityInStock} ${product.unit} in stock`
                : "Out of stock"}
            </p>
          </div>

          {product.quantityInStock > 0 && (
            <div className="flex gap-4">
              <div className="flex items-center ">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">
                  {quantity} {product.unit}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.quantityInStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="flex-1 w-full"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
