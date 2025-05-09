import type { Post } from "@my-blog/common";
import { Page, Section } from "frontend/src/components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { renderPostList } from "../components/renderPostList";

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
        {renderPostList(props.posts)}
      </Section>
    </Page>
  );
}
