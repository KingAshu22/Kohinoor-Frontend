"use client";

import Footer from "@/components/Footer";
import PayButton from "@/components/PayButton";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";

import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const clerkId = user?.id;

  const email = user?.emailAddresses[0].emailAddress;
  const name = user?.fullName;
  const mobile = user?.phoneNumbers[0].phoneNumber;

  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const placeCODOrder = async () => {
    try {
      const response = await fetch("/api/cod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalRounded + 200, // Adjust the amount as needed
          name,
          email,
          mobile,
          streetAddress,
          city,
          postalCode,
          country,
          cartProducts: cart.cartItems,
        }),
      });

      if (response.ok) {
        // Handle successful order placement
        router.push("/payment_success");
      } else {
        // Handle error response
        router.push("/payment_failed");
      }
    } catch (error) {
      console.error("Error placing COD order:", error);
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
                <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between">
                  <div className="flex items-center">
                    <Image
                      src={cartItem.item.media[0]}
                      width={100}
                      height={100}
                      className="rounded-lg w-32 h-32 object-cover"
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
                    <p className="text-body-bold">{cartItem.quantity}</p>
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

          <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
            <div className="pb-4">
              <p className="text-heading4-bold">Address</p>
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
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
              <span>Sub Total</span>
              <span>₹ {totalRounded}</span>
            </div>
            <div className="flex justify-between text-body-semibold">
              <span>Delivery</span>
              <span>₹ 100</span>
            </div>
            <div className="flex justify-between">
              <span>Note: ₹ 100 will be charged extra for COD Orders</span>
            </div>
            <hr />
            <div className="flex justify-between text-body-semibold">
              <span>Total</span>
              <span>₹ {totalRounded + 100}</span>
            </div>
            <PayButton
              amount={totalRounded + parseInt("100")}
              name={name || ""} // Ensure name is a string or default to an empty string
              email={email || ""}
              user={user}
              mobile={mobile || ""}
              streetAddress={streetAddress || ""}
              city={city || ""}
              postalCode={postalCode || ""}
              country={country || ""}
            />
            <button
              className="border rounded-lg text-body-bold text-black bg-green-600 py-3 w-full hover:bg-white hover:text-black"
              onClick={placeCODOrder}
            >
              Cash On Delivery
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
