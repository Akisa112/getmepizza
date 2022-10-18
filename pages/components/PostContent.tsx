import Link from "next/link";
import ReactMarkdown from "react-markdown";

// UI component for main post content
export default function PostContent({ post }) {
  const wordCount = post?.context.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className='mt-4 mx-4 p-2 text-left border-2 border-gray-200 rounded-lg bg-gray-100 md:max-w-3xl md:mx-auto'>
      <h1 className='mt-6 mb-4 mx-4  text-3xl font-extrabold font-CircularMedium'>
        {post?.title}
      </h1>
      <div className='text-sm mx-4 mb-3 text-gray-500'>
        {createdAt.toISOString()} • {minutesToRead} mins to read
      </div>
      <ReactMarkdown className='mx-4 mb-4'>{post?.context}</ReactMarkdown>
      <aside className='mx-4'>
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </div>
  );
}
