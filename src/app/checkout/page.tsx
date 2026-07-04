import { Suspense } from "react";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center text-zinc-500 dark:text-zinc-400 font-bold">
        Loading Secure Checkout...
      </div>
    }>
      <CheckoutClient />
    </Suspense>
  );
}
