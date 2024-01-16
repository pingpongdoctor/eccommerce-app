'use client';
import React from 'react';
import Avatar from './Avatar';

export default function BlogCard() {
  return (
    <div className="aspect-[2/1] w-full rounded-2xl bg-[url('/assets/abc.avif')] bg-cover bg-center bg-no-repeat text-sm lg:aspect-[1/1.15]">
      <div className="flex h-full w-full items-end rounded-2xl bg-gradient-to-t from-gray-900">
        <div className="flex w-full flex-col gap-3 p-8 lg:gap-2 lg:p-4">
          <div className="flex items-center gap-4 text-gray-300 lg:gap-3">
            <p>Mar 16,2020</p>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="flex items-center gap-3 lg:gap-2">
              <Avatar avatarLink="/assets/abc.avif" avatarPriority={false} />
              <p>Ashley</p>
            </div>
          </div>
          <p className="text-pretty text-base font-semibold text-gray-200">
            This is the blog that you can click to see
          </p>
        </div>
      </div>
    </div>
  );
}
