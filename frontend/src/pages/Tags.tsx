import { Page, Section } from "../components";
import { Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function Tags() {
  const { posts, loading } = usePosts();

  if (loading) return <p>Loading...</p>;

  // Get unique tags and count posts per tag
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort tags by count (descending) and then alphabetically
  const sortedTags = Object.entries(tagCounts).sort(([tagA, countA], [tagB, countB]) => {
    if (countB !== countA) return countB - countA;
    return tagA.localeCompare(tagB);
  });

  return (
    <Page>
      <Section>
        <h1 className="text-4xl font-bold mb-8">Tags</h1>

        <div className="flex flex-wrap gap-4">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="px-4 py-2 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-medium">{tag}</span>
              <span className="text-muted ml-2">({count})</span>
            </Link>
          ))}
        </div>

        {sortedTags.length === 0 && (
          <div className="text-muted">
            No tags available.
          </div>
        )}
      </Section>
    </Page>
  );
}
