import React from 'react';
import { CategoryCard } from '../_components/CategoryCard';
import Link from 'next/link';
import { categoryInfor } from '../utils/utils';

export default function Categories() {
  return (
    <main className="m-4 sm:m-8">
      <div className="flex flex-col gap-4 sm:w-full sm:flex-row sm:flex-wrap sm:gap-8">
        {categoryInfor.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="w-full rounded-xl sm:w-[calc((100%-2rem)/2)]"
            >
              <CategoryCard
                text={category.text}
                revealText={category.revealText}
                className={category.className}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
