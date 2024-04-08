import Carousel from "@/components/Carousuel";
import Collections from "@/components/Collections";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

import Image from "next/image";

const desktopImages = [
  {
    src: "/kohinoor-desktop.gif",
    link: "/",
  },
  {
    src: "/kohinoor-desktop.gif",
    link: "/",
  },
  {
    src: "/kohinoor-desktop.gif",
    link: "/",
  },
];

const mobileImages = [
  {
    src: "/kohinoor-mobile.gif",
    link: "/",
  },
  {
    src: "/kohinoor-mobile.gif",
    link: "/",
  },
  {
    src: "/kohinoor-mobile.gif",
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
      <div className="desktop-header">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/hn.jpg?v=1675403410"
        />
      </div>
      <div className="mobile-bottom-nav">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/image_2.png?v=1675403265"
        />
      </div>
      <Details />
    </>
  );
}

export const dynamic = "force-dynamic";
