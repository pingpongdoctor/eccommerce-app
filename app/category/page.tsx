import React from "react";
import { CategoryCard } from "../_components/CategoryCard";
import Link from "next/link";

const categoryInfor: {
  id: string;
  text: string;
  revealText: string;
  className: string;
}[] = [
  {
    id: "comestic",
    text: "Comestic Collection",
    revealText: "Discover Comestic Products",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "supplement",
    text: "Supplement Products",
    revealText: "Find Your Wanted Supplements",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "food",
    text: "Canadian Food",
    revealText: "Enjoy Canadian Food",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
  {
    id: "other",
    text: "Other Merchandises",
    revealText: "What ever you find can be here",
    className: "w-full rounded-xl [&_p]:text-3xl sm:[&_p]:text-4xl",
  },
];

export default function Categories() {
  return (
    <main className="m-4 sm:m-8">
      <ul className="flex list-none flex-col gap-4 sm:w-full sm:flex-row sm:flex-wrap sm:gap-8">
        {categoryInfor.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="w-full rounded-xl sm:w-[calc((100%-2rem)/2)]"
            >
              <li>
                <CategoryCard
                  text={category.text}
                  revealText={category.revealText}
                  className={category.className}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
