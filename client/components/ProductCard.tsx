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
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Product } from "@/lib/types";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addItem,
  decreaseItemQuantity,
  getCartItemIds,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "@/reducers/cart/cartSlice";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const currentCartItemIds = useAppSelector(getCartItemIds);
  const dispatch = useAppDispatch();
  const currentQuantity = useAppSelector(getCurrentQuantityById(product._id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);
    const curProduct = {
      ...product,
      quantity: 1,
    };

    dispatch(addItem(curProduct));

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

          {currentCartItemIds.includes(product._id) ? (
            <div className="flex items-center w-full justify-between">
              <Button variant={"destructive"}>
                <Trash className="h-4 w-4" />
                Delete
              </Button>
              <div className="flex items-center gap-2 rounded-md">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(decreaseItemQuantity(`${product._id}`));
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{currentQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(increaseItemQuantity(`${product._id}`));
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
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
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
