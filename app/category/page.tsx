import React from "react";
import { CategoryCard } from "../_components/CategoryCard";
import Link from "next/link";
import { categoryInfor } from "../utils/utils";
import { baseUrl } from "../utils/baseUrl";

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
