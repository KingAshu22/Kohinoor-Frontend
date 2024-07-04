"use client";

import useCart from "@/lib/hooks/useCart";
import { CircleUserRound, Menu, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/" className="text-heading3-bold">
        <Image src="/Kohinoor_Logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}
        >
          Home
        </Link>
        <Link
          href={"/collections/662c976dd926b5475c3a4430"}
          className={`hover:text-red-1 ${
            pathname === "/collections/662c976dd926b5475c3a4430" && "text-red-1"
          }`}
        >
          Gold Collection
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-xl">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/bag"
          className="flex items-center gap-3 border rounded-xl px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingBag />
          <p className="text-base-bold">Bag ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-xl border bg-white text-base-bold lg:hidden">
            <Link href="/" className="hover:text-red-1">
              Home
            </Link>
            <Link
              href={"/collections/662c976dd926b5475c3a4430"}
              className="hover:text-red-1"
            >
              Gold Collection
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-xl px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingBag />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
