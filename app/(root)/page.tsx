import Carousel from "@/components/Carousuel";
import Collections from "@/components/Collections";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

import Image from "next/image";

const desktopImages = [
  {
    src: "/logo.png",
    link: "/",
  },
  {
    src: "/intro.png",
    link: "/",
  },
  {
    src: "/gold.png",
    link: "/",
  },
  {
    src: "/silver.png",
    link: "/",
  },
  {
    src: "/bjp.png",
    link: "/",
  },
  {
    src: "/congress.png",
    link: "/",
  },
];

const mobileImages = [
  {
    src: "/logo_mobile.png",
    link: "/",
  },
  {
    src: "/intro_mobile.png",
    link: "/",
  },
  {
    src: "/gold_mobile.png",
    link: "/",
  },
  {
    src: "/silver_mobile.png",
    link: "/",
  },
  {
    src: "/bjp_mobile.png",
    link: "/",
  },
  {
    src: "/congress_mobile.png",
    link: "/",
  },
];

export default function Home() {
  return (
    <>
      <div className="desktop-header">
        <Carousel images={desktopImages} />
      </div>
      <div className="mobile-bottom-nav">
        <Carousel images={mobileImages} />
      </div>
      <Collections />
      <ProductList />
      {/* <div className="desktop-header">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/hn.jpg?v=1675403410"
        />
      </div> */}
      {/* <div className="mobile-bottom-nav">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/image_2.png?v=1675403265"
        />
      </div> */}
      <Details />
    </>
  );
}

export const dynamic = "force-dynamic";
