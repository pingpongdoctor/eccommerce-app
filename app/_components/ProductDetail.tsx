import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { builder } from "../utils/imageBuilder";

export default function Product({ product }: { product: SanityDocument }) {
  const { title, mainImage, body } = product;
  return (
    <main className="container prose prose-lg mx-auto p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage ? (
        <Image
          className="float-left m-0 mr-4 w-1/3 rounded-lg"
          src={builder
            .image(mainImage)
            .width(300)
            .height(300)
            .quality(80)
            .url()}
          width={300}
          height={300}
          alt={mainImage.alt || ""}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
