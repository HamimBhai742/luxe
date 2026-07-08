"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import DashboardSidebar from "@/components/dashboard/user/DashboardSidebar";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { clearCredentials } from "@/lib/features/auth/authSlice";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const authUserStr = localStorage.getItem("authUser");
    if (authUserStr) {
      try {
        const authUser = JSON.parse(authUserStr);
        if (authUser.role === "admin" || authUser.email === "admin@gmail.com") {
          router.replace("/admin/dashboard");
        }
      } catch (err) {
        console.error("Error parsing authUser in dashboard layout:", err);
      }
    }
  }, [router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      toast.info(`Searching dashboard for: "${searchVal}"`);
    }
  };

  return (
    <div className="flex bg-zinc-50/50 dark:bg-zinc-950/10 min-h-screen text-zinc-800 dark:text-zinc-200">
      
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================================================================= */}
      <aside className="hidden md:block w-72 shrink-0 border-r border-zinc-200 dark:border-zinc-800 h-screen sticky top-0 z-30 bg-white dark:bg-zinc-950">
        <DashboardSidebar />
      </aside>

      {/* ========================================================================= */}
      {/* RIGHT MAIN CONTENT PANEL */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        
        {/* TOP DEDICATED HEADER */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          
          {/* Left search form & Mobile hamburger */}
          <div className="flex items-center gap-3.5 flex-1 max-w-lg">
            {/* Hamburger (Mobile only) */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden rounded-lg p-1.5 text-zinc-550 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <svg className="absolute left-3.5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
              <input
                type="text"
                placeholder="Search orders, items..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-250 outline-none focus:border-zinc-300 dark:focus:border-zinc-700 transition-all placeholder:text-zinc-400"
              />
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Help Question mark */}
            <button
              onClick={() => toast.info("Dashboard documentation coming soon!")}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-white transition-colors cursor-pointer"
              title="Help"
            >
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </button>

            {/* Cart with badge */}
            <Link
              href="/cart"
              className="relative text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              title="Shopping Cart"
            >
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h6.75" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile avatar drop-down trigger */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm hover:ring-2 hover:ring-blue-500/20 transition-all"
                />
              </button>

              {isProfileDropdownOpen && (
                <>
                  {/* Overlay to close on click outside */}
                  <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />
                  
                  {/* Dropdown panel */}
                  <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-950 p-1.5 shadow-lg dark:shadow-zinc-950/80 z-40 animate-fade-in text-xs font-semibold text-zinc-700 dark:text-zinc-350">
                    <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="block text-zinc-900 dark:text-white font-extrabold truncate">{user?.name || "Customer"}</span>
                      <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{user?.email || ""}</span>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      >
                        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Overview</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      >
                        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="py-1 border-t border-zinc-100 dark:border-zinc-900">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          dispatch(clearCredentials());
                          toast.success("Sign out successful!");
                          router.push("/sign-in");
                        }}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors cursor-pointer font-bold"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        {/* INNER DYNAMIC PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER OVERLAY SIDEBAR */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          {/* Backdrop Blur Click to close */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMobileDrawerOpen(false)} />
          
          {/* Sidebar wrapper panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-zinc-950 shadow-2xl animate-slide-right z-55 flex flex-col">
            
            {/* Dismiss close button */}
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-zinc-50 dark:bg-zinc-900 p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer z-20"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Sidebar Contents */}
            <div className="flex-1 h-full">
              <DashboardSidebar onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
