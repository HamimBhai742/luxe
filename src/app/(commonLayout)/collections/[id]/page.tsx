import { ALL_PRODUCTS } from "@/lib/mockData";
import CollectionDetailsClient from "@/components/collections/CollectionDetailsClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  const product = ALL_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <CollectionDetailsClient product={product} allProducts={ALL_PRODUCTS} />
  );
}
