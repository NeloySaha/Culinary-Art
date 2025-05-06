"use server";

import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  await deleteSession();
}

// Function to get filter data (categories and price range)
export async function getFilterData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/products/filter-data`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filter data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filter data:", error);
    // Return default values if API fails
    return {
      categories: [],
      priceRange: { min: 0, max: 1000 },
    };
  }
}

// Function to get filtered products
export async function getFilteredProducts(
  searchParams: Record<string, string | undefined>
) {
  try {
    // Build query string from search params
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    // Set default page if not provided
    if (!searchParams.page) {
      params.set("page", "1");
    }

    // Set default limit
    params.set("limit", "12");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/products?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return {
      products: data.products,
      pagination: {
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty data if API fails
    return {
      products: [],
      pagination: {
        total: 0,
        page: 1,
        totalPages: 0,
      },
    };
  }
}
