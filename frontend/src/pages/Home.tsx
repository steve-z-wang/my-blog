import type { Post } from "@my-blog/common";
import { Page, Section } from "frontend/src/components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-router";

export interface HomeProps {
  posts: Post[];
}

export default function Home(props: HomeProps) {
  return (
    <Page className="flex flex-col">
      {/* Welcome Section */}
      <Section>
        {/* Welcome */}
        <h1 className="text-4xl font-bold">👋 Welcome to sw.log</h1>

        {/* Description */}
        <p className="mt-4">
          Hi, this is Steve. I'm documenting my learning and thoughts in this
          blog starting 2025.
        </p>

        {/* Social Links */}
        <ul className="flex space-x-4 mt-6">
          <li>
            <a
              href="https://www.linkedin.com/in/stevewang2000/"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="mailto:stevewang.at.work@gmail.com"
              aria-label="Email Steve"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a href="https://github.com/steve-z-wang" aria-label="GitHub">
              <FiGithub className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </Section>

      {/* Timeline Section */}
      <Section hasHorizontalPadding={false}>
        <div className="bg-surface shadow-md rounded-none sm:rounded-lg">
          <ul className="divide-y">
            {props.posts.map((post) => (
              <li className="p-4" key={post.postId}>
                {/* Post Title */}
                <Link to={`/posts/${post.postId}`}>
                  <h2 className="font-bold text-2xl">{post.title}</h2>
                </Link>

                {/* Post Summary */}
                <p className="mt-2 text-muted">{post.summary}</p>

                {/* Date & Tags */}
                <p className="mt-2 text-sm text-muted">
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
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Page>
  );
}
