"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useCart from "@/lib/hooks/useCart";
import {
  Heart,
  Home,
  ShoppingBag,
  Box,
  Search,
  CircleUserRound,
} from "lucide-react";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();
  const { user } = useUser();

  const [query, setQuery] = useState("");

  const navItems = [
    { path: "/", icon: <Home />, label: "Home" },
    { path: "/wishlist", icon: <Heart />, label: "Wishlist" },
    { path: "/orders", icon: <Box />, label: "Orders" },
    {
      path: "/bag",
      icon: (
        <div className="relative">
          <ShoppingBag />
          {cart.cartItems.length > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 absolute -top-1 right-6">
              {cart.cartItems.length}
            </span>
          )}
        </div>
      ),
      label: "Bag",
    },
  ];

  return (
    <>
      <div className="bg-gray-900 fixed bottom-0 left-0 right-0">
        <nav className="container mx-auto pl-10 pr-10 py-2">
          <div className="flex justify-between">
            {navItems.map(({ path, icon, label }) => (
              <Link
                href={path}
                key={path}
                className={`flex flex-col items-center justify-center text-white py-2 ${
                  pathname === path ? "bg-red-500 px-4 rounded-xl" : ""
                }`}
              >
                {icon}
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <header className="bg-white-800 sticky top-0 z-50">
        <div className="flex justify-between items-center py-4 px-8">
          <Link
            href="/"
            className="text-white text-lg font-bold -ml-5"
            passHref
          >
            <Image
              src="/Kohinoor_Logo.png"
              alt="logo"
              width={130}
              height={100}
            />
          </Link>
          {/* <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-xl">
            <input
              className="outline-none max-sm:max-w-[120px] bg-transparent"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              disabled={query === ""}
              onClick={() => router.push(`/search/${query}`)}
            >
              <Search className="text-white cursor-pointer h-4 w-4 hover:text-red-1" />
            </button>
          </div> */}
          <div className="flex items-center">
            {user ? (
              <UserButton afterSignOutUrl="/sign-in" />
            ) : (
              <Link className="ml-10" href="/sign-in">
                <CircleUserRound />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
