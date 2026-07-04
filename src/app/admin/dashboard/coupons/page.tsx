import { Suspense } from "react";
import AdminCouponsClient from "@/components/dashboard/admin/AdminCouponsClient";

export default function AdminCouponsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-64 items-center justify-center text-zinc-500 dark:text-zinc-400 font-bold">
        Loading Coupons Console...
      </div>
    }>
      <AdminCouponsClient />
    </Suspense>
  );
}
