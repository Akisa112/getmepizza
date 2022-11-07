import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin }) {
  // Naive method to calc word count and read time
  const wordCount = post?.context.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className='mt-6 mx-2 text-left px-4 py-3 ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-2xl'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl cursor-pointer hover:scale-105 transition-all'>
          <Link href={`/${post.username}/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h2>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            {post.published ? (
              <p className='font-CircularMedium text-sm text-green-600'>Live</p>
            ) : (
              <p className='font-CircularMedium text-sm text-red-600'>Draft</p>
            )}
            <button className='px-2 font-CircularMedium bg-gray-200 dark:bg-zinc-800 rounded-full   text-center  hover:scale-105 transition-all'>
              <Link href={`/posts/${post.slug}`}>
                <a>Edit</a>
              </Link>
            </button>
          </>
        )}
      </div>
      <p className='mt-2 mb-1 h-[72px] line-clamp-3'>{post.context}</p>

      <Link href={`/${post.username}`}>
        <a className='text-gray-600 dark:text-zinc-300 hover:text-orange-500 transition-all'>
          <small>By @{post.username}</small>
        </a>
      </Link>

      <footer className='flex justify-between text-gray-800 dark:text-zinc-400'>
        <p>
          {wordCount} words. {minutesToRead} min read
        </p>
        <p className=''>🔥 {post.heartCount || 0}</p>
      </footer>
    </div>
  );
}
