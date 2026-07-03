import CollectionsClient from "@/components/collections/CollectionsClient";
import { ALL_PRODUCTS } from "@/lib/mockData";

export default function CollectionsPage() {
  return <CollectionsClient products={ALL_PRODUCTS} />;
}
