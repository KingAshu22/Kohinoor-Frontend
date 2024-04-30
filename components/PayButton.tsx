// Declare Razorpay property on window object
declare global {
  interface Window {
    Razorpay: any; // Adjust the type accordingly if possible
  }
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useCart from "@/lib/hooks/useCart";

export default function PayButton({
  amount,
  name,
  user,
  mobile,
  streetAddress,
  city,
  postalCode,
  country,
}: {
  amount: number;
  name: string;
  user: any; // Adjust the type accordingly
  mobile: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
}) {
  const router = useRouter();

  const cart = useCart();
  const cartProducts = cart.cartItems;

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [keyId, setKeyId] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      try {
        if (!user) {
          router.push("sign-in");
        } else {
          const response = await axios.get("/api/config");
          setKeyId(response.data.RAZORPAY_KEY_ID);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    }

    fetchConfig();
  }, []);

  const makePayment = async () => {
    try {
      await initializeRazorpay();

      const data = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          name,
          mobile,
          streetAddress,
          city,
          postalCode,
          country,
          cartProducts,
        }),
      }).then((t) => t.json());

      var options = {
        key: keyId,
        name: "Kohinoor Flags & Batches",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for your Order",
        image: "https://manuarora.in/logo.png",
        handler: async function (response: any) {
          const body = { ...response };
          const res = await axios.post("/api/validate", body);

          if (res.status == 200) {
            router.push("/payment_success");
          } else {
            router.push("/payment_failed");
          }
        },
        prefill: {
          name,
          contact: mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Check if Razorpay is loaded before creating paymentObject
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Error making payment:", error);
      // Handle error gracefully
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = (error) => {
        reject(new Error("Failed to load Razorpay SDK"));
        reject(error);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      {!isPaymentSuccess && (
        <button
          className="border rounded-lg text-body-bold text-white bg-black py-3 w-full hover:bg-white hover:text-black"
          onClick={() => makePayment()}
        >
          Pay now
        </button>
      )}
    </div>
  );
}
