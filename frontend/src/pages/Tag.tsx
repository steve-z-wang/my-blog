import { Post } from "@my-blog/common";
import { useParams, Link, Navigate } from "react-router";
import { Page, Section } from "../components";
import { renderPostList } from "../components/renderPostList";
import { FiX } from "react-icons/fi";

interface TagProps {
  posts: Post[];
}

export default function Tag({ posts }: TagProps) {
  const { tag } = useParams<{ tag: string }>();

  // Handle case where tag is undefined
  if (!tag) {
    return <Navigate to="/tags" />;
  }

  // Filter posts by the current tag
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <Page>
      <Section>
        <div className="mb-6 flex items-center">
          <h1 className="text-4xl font-bold">{capitalizeTag(tag)}</h1>
        </div>

        {filteredPosts.length > 0 ? (
          <>{renderPostList(filteredPosts)}</>
        ) : (
          <p className="text-xl text-gray-600">
            No posts found with tag {tag}. Try another one!
          </p>
        )}
      </Section>
    </Page>
  );
}

function capitalizeTag(tag: string): string {
    return tag
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

