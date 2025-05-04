import { PostWithoutContent } from '@my-blog/common';
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

function PostItem({ post }: { post: PostWithoutContent }) {
  return (
    <li>
      <Link to={`/posts/${post.post_id}`}>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </Link>
      <p className="text-gray-700 mt-2">{post.summary}</p>
      <p className="text-sm text-gray-500">
        {formatTimestampToDate(post.publish_at)} in {renderTags(post.tags)}
      </p>
    </li>
  );
}

function Timeline({ posts, selectedTags }: { posts: PostWithoutContent[]; selectedTags: string[] }) {
  const filteredPosts = selectedTags.length
    ? posts.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)))
    : posts;

  if (!filteredPosts.length) return <p>No posts match the selected tags.</p>;

  return (
    <ul>
      {filteredPosts.map((post, index) => (
        <div key={post.post_id}>
          <PostItem post={post} />
          {index < filteredPosts.length - 1 && <hr className="my-4 border-gray-300" />}
        </div>
      ))}
    </ul>
  );
}

export default Timeline;