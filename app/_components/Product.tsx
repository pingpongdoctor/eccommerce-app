import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Product({ product }: { product: SanityDocument }) {
  const { title, mainImage, body } = product;
  return (
    <main className="prose prose-lg container mx-auto p-4">
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
