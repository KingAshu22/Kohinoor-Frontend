"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const clerkId = user?.id;
  const name = user?.fullName;
  const mobile = user?.phoneNumbers[0].phoneNumber;

  const cart = useCart();

  const subtotal = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(subtotal.toFixed(2));

  useEffect(() => {
    let discount = 0;
    let discountPercent = 0;

    if (totalRounded > 100000) {
      discountPercent = 18;
      discount = (totalRounded * 18) / 100;
    } else if (totalRounded > 50000) {
      discountPercent = 15;
      discount = (totalRounded * 15) / 100;
    } else if (totalRounded > 10000) {
      discountPercent = 10;
      discount = (totalRounded * 10) / 100;
    }

    setDiscountPercent(discountPercent);
    setDiscount(discount);
  }, [totalRounded]);

  const total = totalRounded - discount;

  const generateQuotation = async () => {
    if (!streetAddress || !city || !state || !postalCode) {
      toast.error(
        "Please fill all address fields before generating quotation."
      );
      return;
    }

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          name,
          mobile,
          streetAddress,
          city,
          postalCode,
          state,
          cartProducts: cart.cartItems,
        }),
      });

      const data = await response.json();
      const { whatsappLink } = data;
      window.location.href = whatsappLink;
    } catch (error) {
      console.error("Error Generating Quotation order:", error);
      toast.error("Error generating quotation. Please try again later.");
    }
  };

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
          <div className="w-2/3 max-lg:w-full">
            <p className="text-heading3-bold">Shopping Bag</p>
            <hr className="my-6" />
            <p className="text-body-bold">No item in Bag</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
          <div className="w-2/3 max-lg:w-full">
            <p className="text-heading3-bold">Shopping Bag</p>
            <hr className="my-6" />
            <div>
              {cart.cartItems.map((cartItem) => (
                <div
                  key={cartItem.item._id}
                  className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
                >
                  <div className="flex items-center">
                    <Image
                      src={cartItem.item.media[0]}
                      width={100}
                      height={100}
                      className="rounded-xl w-32 h-32 object-cover"
                      alt="product"
                    />
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-body-bold">{cartItem.item.title}</p>
                      {cartItem.color && (
                        <p className="text-small-medium">{cartItem.color}</p>
                      )}
                      {cartItem.size && (
                        <p className="text-small-medium">{cartItem.size}</p>
                      )}
                      <p className="text-small-medium">
                        ₹{cartItem.item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <MinusCircle
                      className="hover:text-red-1 cursor-pointer"
                      onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                    />
                    <p className="text-body-bold">{cartItem.quantity} Gross</p>
                    <PlusCircle
                      className="hover:text-red-1 cursor-pointer"
                      onClick={() => cart.increaseQuantity(cartItem.item._id)}
                    />
                  </div>

                  <Trash
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-xl px-4 py-5">
            <div className="pb-4">
              <p className="text-heading4-bold">Address</p>
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                required
                onChange={(ev) => setCity(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                required
                onChange={(ev) => setState(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                required
                onChange={(ev) => setPostalCode(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <p className="text-heading4-bold pb-4">
              Summary{" "}
              <span>{`(${cart.cartItems.length} ${
                cart.cartItems.length > 1 ? "items" : "item"
              })`}</span>
            </p>
            <div className="flex justify-between text-body-semibold">
              <span>Subtotal</span>
              <span>₹ {totalRounded.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-body-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span>- ₹ {discount.toFixed(2)}</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between text-body-semibold">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>
                Note: Recipient covers delivery charges upon receiving shipment.
              </span>
            </div>
            <hr />
            <button
              className="border rounded-xl text-body-bold text-white bg-black py-3 w-full hover:bg-white hover:text-black"
              onClick={generateQuotation}
            >
              Generate Quotation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
