import { useParams, Navigate } from "react-router-dom";
import { Page, Section } from "../components";
import { renderPostList } from "../utils/renderPostList";
import { usePosts } from "../context/PostContext";

export default function Tag() {
  const { tag } = useParams<{ tag: string }>();
  const { posts, loading } = usePosts();

  if (loading) return <p>Loading...</p>;

  // Handle case where tag is undefined
  if (!tag) {
    return <Navigate to="/tags" />;
  }

  // Filter posts by the current tag
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <Page>
      <Section hasHorizontalPadding={false}>
        <div className="px-4 mb-8 flex items-center">
          <h1 className="text-4xl font-bold">{capitalizeTag(tag)}</h1>
        </div>

        {filteredPosts.length > 0 ? (
          <>{renderPostList(filteredPosts)}</>
        ) : (
          <p className="text-muted">
            No posts found with tag {tag}. Try another one!
          </p>
        )}
      </Section>
    </Page>
  );
}

function capitalizeTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
