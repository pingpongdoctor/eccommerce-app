import React from 'react';

export default function ImageSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="aspect-[1/1.2] h-auto w-full rounded-xl bg-slate-200"></div>
      <div className="h-6 w-full bg-slate-200"></div>
      <div className="h-6 bg-slate-200"></div>
    </div>
  );
}
