import { Link } from "react-router";
import { renderPostDetails } from "./renderPostDetails";
import { Post } from "@my-blog/common";

export function renderPostList(posts: Post[]) {
  return (
    <div className="bg-secondary shadow-md rounded-none sm:rounded-lg">
      <ul className="divide-y">
        {posts.map((post) => (
          <li className="p-4" key={post.slug}>
            <Link to={`/posts/${post.slug}`}>
              {/* Post Title */}
              <h2 className="font-bold text-2xl">{post.title}</h2>

              {/* Post Summary */}
              <p className="mt-2 text-muted">{post.summary}</p>

              {/* Date & Tags */}
              {renderPostDetails(post)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
