import React from 'react';

export default function BlogCard() {
  return (
    <ul className="flex list-none flex-wrap justify-between">
      {[1, 2, 3].map((num) => (
        <li
          key={num}
          className="aspect-[1/1.15] w-[calc((100%-8rem)/3)] rounded-2xl bg-[url('/assets/abc.avif')] bg-cover bg-center bg-no-repeat"
        >
          <div className="flex h-full w-full items-end rounded-2xl bg-gradient-to-t from-gray-900">
            <div>
              <p className="text-xl font-semibold text-gray-200">
                This is the blog that you can click to see
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
