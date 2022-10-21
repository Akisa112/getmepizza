import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.context.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className='mt-6 mx-3 text-left px-3 py-2 border-2  border-gray-200 rounded-lg'>
      <div className='flex justify-between'>
        <Link href={`/${post.username}/${post.slug}`}>
          <h2 className='font-bold text-xl cursor-pointer'>
            <a>{post.title}</a>
          </h2>
        </Link>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            {post.published ? (
              <p className='font-CircularMedium text-sm text-green-600'>Live</p>
            ) : (
              <p className='font-CircularMedium text-sm text-red-600'>Draft</p>
            )}
            <Link href={`/posts/${post.slug}`}>
              <h3>
                <button className=' font-CircularMedium bg-gray-200 rounded-full w-12  text-center md:max-w-xs md:mx-auto'>
                  Edit
                </button>
              </h3>
            </Link>
          </>
        )}
      </div>

      <Link href={`/${post.username}`}>
        <a className='text-gray-600'>
          <small>By @{post.username}</small>
        </a>
      </Link>

      <footer className='flex justify-between text-gray-800'>
        <p>
          {wordCount} words. {minutesToRead} min read
        </p>
        <p className=''>🔥 {post.heartCount || 0}</p>
      </footer>
    </div>
  );
}
