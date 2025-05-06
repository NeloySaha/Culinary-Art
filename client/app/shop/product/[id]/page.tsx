import ProductDetail from "@/components/ProductDetail";

const data = {
  _id: "12",
  name: "Organic Coconut Oil",
  description:
    "Cold-pressed, unrefined organic coconut oil. Great for cooking, baking, and beauty applications.",
  price: 14.99,
  quantityInStock: 45,
  category: "Oils & Vinegars",
  imageUrl:
    "https://img.freepik.com/premium-photo/avocado-flat-lay-yellow-background_140266-73.jpg",
  unit: "jar",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product = null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/products/single-product/${id}`
  );
  const data = await res.json();

  if (!data.success)
    return (
      <p className="pt-24 text-center">
        Sorry, couldn't find the product. Please try again
      </p>
    );

  return (
    <section className="max-w-7xl px-4 mx-auto pt-24 scroll-mt-16">
      <ProductDetail product={data.data} />
    </section>
  );
}
