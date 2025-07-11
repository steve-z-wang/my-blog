import { useParams, Navigate } from "react-router-dom";
import { Page, PageTitle, Section } from "../components";
import { renderPostList } from "../utils/renderPostList";
import { usePosts } from "../context/PostContext";

export default function Tag() {
  const { tag } = useParams<{ tag: string }>();
  const { posts, loading } = usePosts();

  // Handle case where tag is undefined
  if (!tag) {
    return <Navigate to="/tags" />;
  }

  // Filter posts by the current tag
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <Page>
      <PageTitle>{capitalizeTag(tag)}</PageTitle>

      <Section hasHorizontalPadding={false}>
        {loading ? null : filteredPosts.length === 0 ? (
          <p className="text-muted">
            No posts found with tag {tag}. Try another one!
          </p>
        ) : (
          <>{renderPostList(filteredPosts)}</>
        )}
      </Section>
    </Page>
  );
}

function capitalizeTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
