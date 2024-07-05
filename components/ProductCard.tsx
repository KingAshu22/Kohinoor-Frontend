"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import useCart from "@/lib/hooks/useCart";
import { getProductDetails } from "@/lib/actions/actions";

interface ProductType {
  _id: string;
  media: string[];
  title: string;
  price: number;
  category: "Gross" | "Individual";
}

interface UserType {
  // Define UserType properties here if needed
}

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const initialQuantity = product.category === "Gross" ? 10 : 1;
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const cart = useCart();

  const handleDecreaseQuantity = () => {
    if (product.category === "Gross" && quantity > 10) {
      setQuantity(quantity - 2);
    } else if (product.category === "Individual" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + (product.category === "Gross" ? 2 : 1));
  };

  return (
    <div className="w-[160px] flex flex-col gap-1">
      <Link href={`/products/${product._id}`}>
        <Image
          src={product.media[0]}
          alt={product.title}
          width={220}
          height={300}
          className="h-[250px] rounded-xl object-cover"
        />
        <div>
          <p className="text-base-bold">{product.title}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            <span className="font-bold text-red-600 text-lg">
              ₹{product.price}{" "}
            </span>
            {product.category === "Gross" ? "/Gross" : "/Box"}
          </p>
        </div>
      </Link>
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={handleDecreaseQuantity}
          />
          <p className="text-body-bold">
            {quantity} {product.category === "Gross" ? "Gross" : "Box"}
          </p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={handleIncreaseQuantity}
          />
        </div>
      </div>
      <button
        className="outline text-base-bold py-3 rounded-xl hover:bg-black hover:text-white"
        onClick={async () => {
          cart.addItem({
            item: await getProductDetails(product._id),
            quantity,
            category: product.category,
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
