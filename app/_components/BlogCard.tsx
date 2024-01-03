'use client';
import React from 'react';
import Avatar from './Avatar';

export default function BlogCard() {
  return (
    <div className="aspect-[1/1.15] min-h-[250px] w-full rounded-2xl bg-[url('/assets/abc.avif')] bg-cover bg-center bg-no-repeat">
      <div className="flex h-full w-full items-end rounded-2xl bg-gradient-to-t from-gray-900">
        <div className="lg::p-8 flex w-full flex-col gap-2 p-4">
          <div className="flex items-center gap-4 text-gray-300 lg:gap-6">
            <p>Mar 16,2020</p>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="flex items-center gap-3">
              <Avatar avatarLink="/assets/abc.avif" avatarPriority={false} />
              <p>Ashley</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-200 lg:text-xl">
            This is the blog that you can click to see
          </p>
        </div>
      </div>
    </div>
  );
}
