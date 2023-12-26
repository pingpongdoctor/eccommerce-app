import { SanityDocument } from "next-sanity";
import Link from "next/link";
import CardComponent from "./CardComponent";

export default function Posts({ posts }: { posts: SanityDocument[] }) {
  if (posts?.length == 0) {
    return <div className="p-4 text-red-500">No posts found</div>;
  }

  return (
    <main className="m-4 sm:m-8">
      <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
        {posts?.length > 0 &&
          posts.map((post) => (
            <Link
              className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
              key={post._id}
              href={`/posts/${post.slug.current}`}
            >
              <CardComponent post={post} />
            </Link>
          ))}
      </ul>
    </main>
  );
}
