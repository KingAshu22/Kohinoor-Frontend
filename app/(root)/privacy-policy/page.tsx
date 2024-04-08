import Head from "next/head";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Privacy Policy - Kohinoor Flags & Batches</title>
        <meta
          name="description"
          content="Terms of Service for Kohinoor Flags & Batches e-commerce website."
        />
      </Head>
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <h2 className="text-xl font-semibold mb-2">
        SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
      </h2>
      <p className="mb-6">
        When you purchase something from our store, as part of the buying and
        selling process, we collect the personal information you give us such as
        your name, address and email address. When you browse our store, we also
        automatically receive your computer’s internet protocol (IP) address in
        order to provide us with information that helps us learn about your
        browser and operating system. Email marketing (if applicable): With your
        permission, we may send you emails about our store, new products and
        other updates.
      </p>
      <h2 className="text-xl font-semibold mb-2">SECTION 2 - CONSENT</h2>
      <p className="mb-6">How do you get my consent?</p>
      <p className="mb-6">
        When you provide us with personal information to complete a transaction,
        verify your credit card, place an order, arrange for a delivery or
        return a purchase, we imply that you consent to our collecting it and
        using it for that specific reason only. If we ask for your personal
        information for a secondary reason, like marketing, we will either ask
        you directly for your expressed consent, or provide you with an
        opportunity to say no.
      </p>
      <p className="mb-6">How do I withdraw my consent? </p>
      <p className="mb-6">
        If after you opt-in, you change your mind, you may withdraw your consent
        for us to contact you, for the continued collection, use or disclosure
        of your information, at anytime, by contacting us at
        kohinoorflags@gmail.com or mailing us at: Kohinoor Flags & Batches,
        Orchid Corporate Park, Royal Palms, Mayur Nagar, Aarey Milk Colony,
        Goregaon East, Mumbai 400 065
      </p>
      <h2 className="text-xl font-semibold mb-2">SECTION 3 - DISCLOSURE</h2>
      <p className="mb-6">
        We may disclose your personal information if we are required by law to
        do so or if you violate our Terms of Service.
      </p>
      <h2 className="text-xl font-semibold mb-2">SECTION 4 - DATA STORAGE</h2>
      <p className="mb-6">
        Your data is stored in our MongoDB database. We utilize MongoDB's data
        storage, databases, and the general MongoDB application to securely
        store your data. Your data is stored on a secure server behind a
        firewall to ensure its protection.
      </p>
      <h2 className="text-xl font-semibold mb-2">
        SECTION 4 - PAYMENT GATEWAY
      </h2>
      <p className="mb-6">
        If you choose a direct payment gateway to complete your purchase, then
        Razorpay stores your credit card data. It is encrypted through the
        Payment Card Industry Data Security Standard (PCI-DSS). Your purchase
        transaction data is stored only as long as is necessary to complete your
        purchase transaction. After that is complete, your purchase transaction
        information is deleted.
      </p>
      <p className="mb-6">
        All direct payment gateways adhere to the standards set by PCI-DSS as
        managed by the PCI Security Standards Council, which is a joint effort
        of brands like Visa, Mastercard, American Express, and Discover. PCI-DSS
        requirements help ensure the secure handling of credit card information
        by our store and its service providers.
      </p>
      <p className="mb-6">
        For more insight, you may also want to read Razorpay’s Terms of Service
        (<a href="https://razorpay.com/legal/">https://razorpay.com/legal/</a>)
        or Privacy Policy (
        <a href="https://razorpay.com/legal/privacy/">
          https://razorpay.com/legal/privacy/
        </a>
        ).
      </p>
      <h2 className="text-xl font-semibold mb-2">
        SECTION 5 - THIRD-PARTY SERVICES
      </h2>
      <p className="mb-6">
        In general, the third-party providers used by us will only collect, use,
        and disclose your information to the extent necessary to allow them to
        perform the services they provide to us.
      </p>
      <p className="mb-6">
        However, certain third-party service providers, such as payment gateways
        and other payment transaction processors, have their own privacy
        policies in respect to the information we are required to provide to
        them for your purchase-related transactions. For these providers, we
        recommend that you read their privacy policies so you can understand the
        manner in which your personal information will be handled by these
        providers.
      </p>
      <p className="mb-6">
        In particular, remember that certain providers may be located in or have
        facilities that are located in a different jurisdiction than either you
        or us. So if you elect to proceed with a transaction that involves the
        services of a third-party service provider, then your information may
        become subject to the laws of the jurisdiction(s) in which that service
        provider or its facilities are located.
      </p>
      <p className="mb-6">
        As an example, if you are located in Canada and your transaction is
        processed by a payment gateway located in the United States, then your
        personal information used in completing that transaction may be subject
        to disclosure under United States legislation, including the Patriot
        Act.
      </p>
      <p className="mb-6">
        Once you leave our store’s website or are redirected to a third-party
        website or application, you are no longer governed by this Privacy
        Policy or our website’s Terms of Service.
      </p>
      <p className="mb-6">
        When you click on links on our store, they may direct you away from our
        site. We are not responsible for the privacy practices of other sites
        and encourage you to read their privacy statements.
      </p>
      <h2 className="text-xl font-semibold mb-2">SECTION 6 - SECURITY</h2>
      <p className="mb-6">
        To protect your personal information, we take reasonable precautions and
        follow industry best practices to ensure it is not inappropriately lost,
        misused, accessed, disclosed, altered, or destroyed.
      </p>
      <p className="mb-6">
        If you provide us with your credit card information, the information is
        encrypted using secure socket layer technology (SSL) and stored with
        AES-256 encryption. Although no method of transmission over the Internet
        or electronic storage is 100% secure, we follow all PCI-DSS requirements
        and implement additional generally accepted industry standards.
      </p>
      <h2 className="text-xl font-semibold mb-2">SECTION 7 - COOKIES</h2>
      <p className="mb-6">
        Here is a list of cookies that we use. We’ve listed them here so that
        you can choose whether to opt-out of cookies or not.
      </p>
      <ul className="list-disc ml-6 mb-6">
        <li>
          _session_id: A unique token that is sessional. It allows our
          authentication service to store information about your session.
        </li>
        <li>
          _clerk_session: A unique token that is sessional. It is used by our
          authentication service to manage your session.
        </li>
        <li>
          _clerk_visit: No data held. Persistent for 30 minutes from the last
          visit. Used by our authentication service's internal stats tracker to
          record the number of visits.
        </li>
        <li>
          _clerk_uniq: No data held. Expires midnight (relative to the visitor)
          of the next day. Counts the number of visits to our website by a
          single customer.
        </li>
        <li>
          cart: A unique token that is persistent for 2 weeks. Stores
          information about the contents of your cart.
        </li>
        <li>_secure_session_id: A unique token that is sessional.</li>
        <li>
          storefront_digest: A unique token that is indefinite. If the shop has
          a password, this is used to determine if the current visitor has
          access.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">SECTION 8 - AGE OF CONSENT</h2>
      <p className="mb-6">
        By using this site, you represent that you are at least the age of
        majority in your state or province of residence, or that you are the age
        of majority in your state or province of residence and you have given us
        your consent to allow any of your minor dependents to use this site.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        SECTION 9 - CHANGES TO THIS PRIVACY POLICY
      </h2>
      <p className="mb-6">
        We reserve the right to modify this privacy policy at any time, so
        please review it frequently. Changes and clarifications will take effect
        immediately upon their posting on the website. If we make material
        changes to this policy, we will notify you here that it has been
        updated, so that you are aware of what information we collect, how we
        use it, and under what circumstances, if any, we use and/or disclose it.
        If our store is acquired or merged with another company, your
        information may be transferred to the new owners so that we may continue
        to sell products to you.
      </p>

      <h2 className="text-xl font-semibold mb-2">SECTION 10 - OTHERS</h2>
      <p className="mb-6">
        By using our website, you (the visitor) agree to allow third parties to
        process your IP address in order to determine your location for the
        purpose of currency conversion. You also agree to have that currency
        stored in a session cookie in your browser (a temporary cookie which
        gets automatically removed when you close your browser). We do this in
        order for the selected currency to remain selected and consistent when
        browsing our website so that the prices can convert to your (the
        visitor's) local currency.
      </p>

      <p className="text-sm text-gray-600">
        If you would like to: access, correct, amend or delete any personal
        information we have about you, register a complaint, or simply want more
        information contact our Privacy Compliance Officer at{" "}
        <a href="mailto:kohinoorflags@gmail.com" className="text-blue-500">
          kohinoorflags@gmail.com
        </a>{" "}
        or call us at 9876543210.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
