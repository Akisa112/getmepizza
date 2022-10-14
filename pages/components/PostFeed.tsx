import Link from 'next/link';


export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false, user }) {
  // Naive method to calc word count and read time
  const wordCount = post?.context.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    
            <div className="mt-10 mx-3 text-left px-3 py-2 border-2  border-gray-200 rounded-lg">
                <p className='text-sm font-Montserrat text-gray-600'>{new Date(post.updatedAt).toLocaleDateString("en-US")}</p>

                <Link href={`/${post.username}/${post.slug}`}>
                    <h2 className='font-bold text-xl'>
                    <a>{post.title}</a>
                    </h2>
                </Link>

                <Link href={`/${post.username}`}>
                    <a className='text-gray-600'>
                    <small>By @{post.username}</small>
                    </a>
                </Link>

                <footer className='flex justify-between text-gray-800'>
                    <p>
                    {wordCount} words. {minutesToRead} min read
                    </p>
                    <p className="">💗 {post.heartCount || 0}</p>
                </footer>

                {/* If admin view, show extra controls for user */}
                {admin && (
                    <>
                    <Link href={`/admin/${post.slug}`}>
                        <h3>
                        <button className="btn-blue">Edit</button>
                        </h3>
                    </Link>

                    {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
                    </>
                )}
            </div>
       
    
  );
}