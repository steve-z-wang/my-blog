import { Post } from "@my-blog/common";
import { Page, Section } from "../components";
import { Link } from "react-router";

interface TagsProps {
  posts: Post[];
}

function computeTagCounts(posts: Post[]): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export default function Tags({ posts }: TagsProps) {
  return (
    <Page>
      <Section>
        <h1 className="text-4xl font-bold">Tags</h1>

        <div className="mt-6 flex gap-3 flex-wrap ">
          {Object.entries(computeTagCounts(posts)).map(([tag, count]) => (
            <Link to={`/tags/${tag}`}>
              <div key={tag} className="flex bg-gray-300 px-2 py-1 rounded-md">
                <h2 className="text font-medium">{tag}</h2>
                <p className="ml-1 font-medium text-xs">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </Page>
  );
}
