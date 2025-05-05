import { Post } from '@my-blog/common';
import { Link } from 'react-router-dom';

function formatTimestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderTags(tags: string[]) {
  return tags.map((tag, index) => (
    <span key={tag} className="font-bold">
      {tag}
      {index < tags.length - 1 && ', '}
    </span>
  ));
}

function PostItem({ post }: { post: Post }) {
  return (
    <li>
      <Link to={`/posts/${post.postId}`}>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </Link>
      <p className="text-gray-700 mt-2">{post.summary}</p>
      <p className="text-sm text-gray-500 mt-2">
        {formatTimestampToDate(post.publishedAt)} in {renderTags(post.tags)}
      </p>
    </li>
  );
}

function Timeline({ posts, selectedTags, setSelectedTags }: { posts: Post[]; selectedTags: string[]; setSelectedTags: React.Dispatch<React.SetStateAction<string[]>> }) {
  const filteredPosts = selectedTags.length
    ? posts.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)))
    : posts;

  if (!filteredPosts.length) return <p>No posts match the selected tags.</p>;

  return (
    <>
      {selectedTags.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full cursor-pointer"
                onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>
      )}

      <ul>
        {filteredPosts.map((post, index) => (
          <div key={post.postId}>
            <PostItem post={post} />
            {index < filteredPosts.length - 1 && <hr className="my-4 border-gray-300" />}
          </div>
        ))}
      </ul>
    </>
  );
}

export default Timeline;