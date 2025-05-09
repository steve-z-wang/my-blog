import { Post } from "@my-blog/common";
import Archive from "./Archive";
import { Dispatch, SetStateAction } from "react";

interface DateFilter {
  year: string;
  month: string;
}

interface SidebarProps {
  posts: Post[];
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  selectedDate: DateFilter | null;
  setSelectedDate: Dispatch<SetStateAction<DateFilter | null>>;
}

function Sidebar({
  posts,
  selectedTags,
  setSelectedTags,
  selectedDate,
  setSelectedDate,
}: SidebarProps) {
  const allTags = posts.reduce((acc: Record<string, number>, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const toggleTag = (tag: string) => {
    setSelectedDate(null); // Clear date filter when selecting tags
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDateSelect = (filter: DateFilter | null) => {
    setSelectedTags([]); // Clear tag filters when selecting date
    setSelectedDate(filter);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-semibold">Tags</h3>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {Object.entries(allTags).map(([tag, count]) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag} <span className="text-xs opacity-70 ml-1">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <Archive
        posts={posts}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
}

export default Sidebar;
