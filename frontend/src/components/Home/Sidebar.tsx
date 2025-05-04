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

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-md font-semibold">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {Object.entries(allTags).map(([tag, count]) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag)
                ? 'bg-blue-200 text-blue-800'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
            onClick={() => toggleTag(tag)}
          >
            {tag} ({count})
          </button>
        ))}
      </div>
    </>
  );
}

export default Sidebar;