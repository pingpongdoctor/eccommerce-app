import React from "react";
import { SanityDocument } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
import ButtonComponent from "./ButtonComponent";

const builder = imageUrlBuilder({ projectId, dataset });

export default function CardComponent({ post }: { post: SanityDocument }) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      {post?.mainImage ? (
        <img
          className="object-fit aspect-square h-auto w-full rounded-lg"
          src={builder.image(post.mainImage).quality(80).url()}
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
            {post.title ? post.title : "No Title"}
          </h5>
        }

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.description}
        </p>
        <ButtonComponent buttonName="Readmore" buttonColor="blue" />
      </div>
    </div>
  );
}
