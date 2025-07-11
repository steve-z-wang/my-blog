import { Page, PageTitle, Section } from "../components";
import { Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function Tags() {
  const { posts, loading } = usePosts();

  // Get unique tags and count posts per tag
  const tagCounts = posts.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  // Sort tags by count (descending) and then alphabetically
  const sortedTags = Object.entries(tagCounts).sort(
    ([tagA, countA], [tagB, countB]) => {
      if (countB !== countA) return countB - countA;
      return tagA.localeCompare(tagB);
    }
  );

  return (
    <Page>
      <PageTitle>Tags</PageTitle>

      <Section>
        {loading ? null : sortedTags.length === 0 ? (
          <p className="text-muted">No tags available.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="px-4 py-2 bg-secondary rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <span className="font-semibold">{tag}</span>
                  <span className="text-muted ml-1 text-sm font-medium">
                    {count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </Page>
  );
}
