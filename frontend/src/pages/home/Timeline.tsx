import { Post } from '@my-blog/common';
import { Link } from 'react-router-dom';

interface DateFilter {
  year: string;
  month: string;
}

interface TimelineProps {
  posts: Post[];
  selectedTags: string[];
  selectedDate: DateFilter | null;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  postsPerPage: number;
  onPageChange: (page: number) => void;
}

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
    <li className="text-base">
      <Link to={`/posts/${post.postId}`}>
        <h2 className="font-bold">{post.title}</h2>
      </Link>
      <p className="mt-2 text-current text-gray-700">{post.summary}</p>
      <p className="mt-2 text-sm text-gray-500">
        {formatTimestampToDate(post.publishedAt)} in {renderTags(post.tags)}
      </p>
    </li>
  );
}

function Timeline({ 
  posts, 
  selectedTags, 
  selectedDate, 
  setSelectedTags,
  currentPage,
  postsPerPage,
  onPageChange 
}: TimelineProps) {
  let filteredPosts = posts;

  // Apply tag filters
  if (selectedTags.length) {
    filteredPosts = posts.filter((post) => 
      post.tags.some((tag) => selectedTags.includes(tag))
    );
  }

  // Apply date filters
  if (selectedDate) {
    filteredPosts = filteredPosts.filter((post) => {
      const date = new Date(post.publishedAt * 1000);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('en-US', { month: 'long' });
      return year === selectedDate.year && month === selectedDate.month;
    });
  }

  if (!filteredPosts.length) {
    if (selectedDate) {
      return (
        <p>No posts found for {selectedDate.month} {selectedDate.year}.</p>
      );
    }
    return <p>No posts match the selected tags.</p>;
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

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
        {paginatedPosts.map((post, index) => (
          <div key={post.postId}>
            <PostItem post={post} />
            {index < paginatedPosts.length - 1 && <hr className="my-4 border-gray-300" />}
          </div>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Timeline;