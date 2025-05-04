import { PostWithoutContent } from '@my-blog/common';

function Sidebar({ posts, selectedTags, setSelectedTags }: { posts: PostWithoutContent[]; selectedTags: string[]; setSelectedTags: React.Dispatch<React.SetStateAction<string[]>> }) {
  const allTags = posts.reduce((acc: Record<string, number>, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => setSelectedTags([]);

  return (
    <>
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Filtering by:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
          <button
            className="mt-2 text-sm text-red-600 underline"
            onClick={clearAll}
          >
            ✦ Clear All
          </button>
        </div>
      )}

      <div>
        <h3 className="text-md font-semibold mb-2">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(allTags).map(([tag, count]) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag} ({count})
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;