"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import useCart from "@/lib/hooks/useCart";
import { getProductDetails } from "@/lib/actions/actions";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const [quantity, setQuantity] = useState<number>(10);
  const cart = useCart();
  return (
    <div className="w-[160px] flex flex-col gap-1">
      <Link href={`/products/${product._id}`}>
        <Image
          src={product.media[0]}
          alt="product"
          width={220}
          height={300}
          className="h-[250px] rounded-xl object-cover"
        />
        <div>
          <p className="text-base-bold">{product.title}</p>
          <p className="text-small-medium text-grey-2">{product.category}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-body-bold">₹{product.price}</p>
          <HeartFavorite
            product={product}
            updateSignedInUser={updateSignedInUser}
          />
        </div>
      </Link>
      <button
        className="outline text-base-bold py-3 rounded-xl hover:bg-black hover:text-white"
        onClick={async () => {
          cart.addItem({
            item: await getProductDetails(product._id),
            quantity,
            color: "",
            size: "",
          });
        }}
      >
        Add To Bag
      </button>
    </div>
  );
};

export default ProductCard;
