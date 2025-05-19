import { useEffect } from "react";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import type { Post } from "@my-blog/common";

export default function RSS() {
  const { posts, loading } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    console.log(`Generating RSS feed with ${posts.length} posts`);
    
    // Create RSS XML content
    const rssFeed = generateRSSFeed(posts);
    
    // Create a blob and download it
    const blob = new Blob([rssFeed], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    console.log('RSS feed blob URL created:', url);
    
    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download = "feed.xml";
    document.body.appendChild(link);
    link.click();
    console.log('Download triggered');
    document.body.removeChild(link);
    
    // Clean up the blob URL
    URL.revokeObjectURL(url);
    
    // Redirect back to homepage after download starts
    setTimeout(() => {
      console.log('Redirecting to homepage');
      navigate("/");
    }, 1000); // Short delay to ensure download starts
  }, [loading, posts, navigate]);

  // Return a div to make this a valid React component
  return <div style={{ display: "none" }}>Generating RSS feed...</div>;
}

function generateRSSFeed(posts: Post[]) {
  const host = window.location.origin;
  const now = new Date().toUTCString();
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>sw.log</title>
  <description>Steve's blog documenting learning and thoughts</description>
  <link>${host}</link>
  <atom:link href="${host}/feed" rel="self" type="application/rss+xml" />
  <lastBuildDate>${now}</lastBuildDate>
`;

  // Add items for each post
  posts.forEach(post => {
    const postDate = new Date(post.publishedAt * 1000).toUTCString();
    const postLink = `${host}/posts/${post.slug}`;
    
    rss += `  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${postLink}</link>
    <guid isPermaLink="true">${postLink}</guid>
    <pubDate>${postDate}</pubDate>
    <description><![CDATA[${post.summary || ''}]]></description>
    ${post.tags.map(tag => `<category>${tag}</category>`).join('\n    ')}
  </item>
`;
  });

  rss += `</channel>
</rss>`;

  return rss;
}
