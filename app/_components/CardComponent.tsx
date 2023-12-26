import React from "react";
import { SanityDocument } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import ButtonComponent from "./ButtonComponent";

const builder = imageUrlBuilder({ projectId, dataset });

export default function CardComponent({
  product,
}: {
  product: SanityDocument;
}) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow transition-all duration-300 hover:shadow-lg">
      {product?.mainImage ? (
        <img
          className="object-fit aspect-square h-auto w-full rounded-lg"
          src={builder.image(product.mainImage).quality(80).url()}
          alt="product image"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center">
          No image found
        </div>
      )}
      <div className="p-5">
        {
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title ? product.title : "No Title"}
          </h5>
        }

        <p className="mb-3 line-clamp-3 h-[4.5rem] text-pretty font-normal text-gray-700 dark:text-gray-400">
          {product.description ? product.description : "No Description"}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $599
          </p>
          <ButtonComponent
            buttonName="Add to cart"
            buttonColor="black"
            animate={false}
            buttonClassname="text-sm h-[40px]"
          />
        </div>
      </div>
    </div>
  );
}
