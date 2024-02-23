import Link from 'next/link';
import { categoryInfor } from '../utils/utils';
import { CategoryCard } from './CategoryCard';

export default function CategoryCards() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:w-full lg:flex-row lg:flex-wrap lg:gap-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      {categoryInfor.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="rounded-xl lg:w-[calc((100%-2rem)/2)]"
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
  );
}
