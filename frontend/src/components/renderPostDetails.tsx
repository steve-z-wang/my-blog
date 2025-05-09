export function renderPostDetails(post: { postId: string; publishedAt: number; title: string; summary: string | null; tags: string[]; content?: string | undefined; comments?: { content: string; commentId: number; parentCommentId: number | null; authorName: string; createdAt?: number | undefined; children?: any[] | undefined; }[] | undefined; }) {
  return <p className="mt-2 text-sm text-muted">
    {new Date(post.publishedAt * 1000).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}{" "}
    in{" "}
    {post.tags.map((tag, index) => (
      <span key={tag} className="font-bold">
        {tag}
        {index < post.tags.length - 1 && ", "}
      </span>
    ))}
  </p>;
}
