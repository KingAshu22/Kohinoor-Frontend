import Head from "next/head";

const ReturnRefundPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Return & Refund Policy - Kohinoor Flags & Batches</title>
        <meta
          name="description"
          content="Return and Refund Policy for Kohinoor Flags & Batches e-commerce website."
        />
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Returns and Refunds</h1>
      <p className="mb-6">
        Applicable to Domestic Transactions Only (Purchases shipped within
        India)
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Returns & Exchanges</h2>
        <p className="mb-4">
          We offer a refund if you do not like the product purchased from our
          website. Please refer to the details, process, and conditions below.
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>If you do not like the product</li>
          <li>If you want to exchange it with another product</li>
          <li>If the garment doesn’t fit you well</li>
        </ul>
        <p className="mb-4">
          You can go to the "Customer Service" section on our website for
          actioning the above.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
        <p className="mb-4">
          If you do not want any alternate product in exchange and want to
          return the product, we shall refund the money paid by you. If you have
          claimed any discount or benefit while placing the order, such discount
          or benefit shall be adjusted while issuing the refund.
        </p>
        <p className="mb-4">
          Please give us a week after we receive the product back to process the
          refund.
        </p>
        <p className="mb-4">
          To avail any of the above options, the product should be unused and
          intact with all the tags and labels. We would do a Quality Check upon
          return to verify the same.
        </p>
        <p>We do not accept and returns or exchanges of altered garments.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Special Offers</h2>
        <p className="mb-4">
          Products categorized under Special Offers like "Buy 2 Get 1 Free",
          "Women's Day Special", "Mothers' Day", "Clearance", "Holi Special" etc
          will neither be refundable nor exchangeable.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="mb-4">
          For any further queries or assistance, you can reach us at:
        </p>
        <p>
          Phone:{" "}
          <a href="tel:9876543210" className="text-blue-500">
            9876543210
          </a>{" "}
          (Operates from 10 AM to 6 PM, Monday through Saturday)
        </p>
        <p>
          Email:{" "}
          <a href="mailto:kohinoorflags@gmail.com" className="text-blue-500">
            kohinoorflags@gmail.com
          </a>
        </p>
      </div>
      <p className="text-sm text-gray-600">
        Please note, by purchasing from Kohinoor Flags & Batches, you as the
        buyer agree to our shopping terms, conditions, and policies.
      </p>
    </div>
  );
};

export default ReturnRefundPage;
