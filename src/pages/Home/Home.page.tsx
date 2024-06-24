import type { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import ReactPlayer from "react-player/vimeo";

import Products from "@components/Products";

import type { Product } from "@utils/types/shopify";

import { BackgroundVideo, productsStyles } from "./Home.styles";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";

interface HomeProps {
  products: Product[],
  video?: string,
}

const Home: FunctionComponent<HomeProps> = ({
  products,
  video,
}) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  document.addEventListener("scroll", () => {
    if (window.scrollY < 0) { return; }
    setScrollY(window.scrollY * 2);
  });

  return (
    <>
      {video && (
        <BackgroundVideo className="background__video" aspectRatio={32 / 13} style={{ "--scroll": `${scrollY}px` }}>
          <ReactPlayer
            url={video}
            playsinline
            playing={true}
            loop
            muted
          />
        </BackgroundVideo>
      )}
      <Products className={productsStyles}>
        {products.map(product => (
          <Products.Product {...product} key={product.id} />
        ))}
      </Products>
    </>
  );
};

const HomeWithTemplate = withTemplate(Home, false);

register(HomeWithTemplate);
