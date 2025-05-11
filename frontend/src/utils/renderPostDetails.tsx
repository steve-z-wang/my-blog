import { Post } from "@my-blog/common";

export function renderPostDetails(post: Post) {
  return (
    <div className="mt-2 text-sm text-muted font-medium">
      {new Date(post.publishedAt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}{" "}
      in{" "}
      {post.tags.map((tag, index) => (
        <span key={tag} className="font-bold">
          {tag}
          {index < post.tags.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
}
