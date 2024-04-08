"use client";

import Image from "next/image";
import Link from "next/link";

const SuccessfulPayment = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <Image src="/failed.png" alt="success" width={130} height={100} />
      <p className="text-heading4-bold text-red-600">Payment Failed!</p>
      <p>Please Try Again.</p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white"
      >
        TRY AGAIN
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
