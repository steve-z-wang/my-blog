import type { Post } from "@my-blog/common";
import { Page, Section } from "frontend/src/components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { renderPostList } from "../components/renderPostList";
import { SOCIAL_LINKS, SITE_CONFIG } from "../constants";

export interface HomeProps {
  posts: Post[];
}

export default function Home(props: HomeProps) {
  return (
    <Page className="flex flex-col">
      {/* Welcome Section */}
      <Section>
        {/* Welcome */}
        <h1 className="text-4xl font-bold">{SITE_CONFIG.WELCOME_MESSAGE}</h1>

        {/* Description */}
        <p className="mt-4">{SITE_CONFIG.INTRO_TEXT}</p>

        {/* Social Links */}
        <ul className="flex space-x-4 mt-6">
          <li>
            <a href={SOCIAL_LINKS.LINKEDIN} aria-label="LinkedIn">
              <FiLinkedin className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} aria-label="Email">
              <FiMail className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.GITHUB} aria-label="GitHub">
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
