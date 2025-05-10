import { Page, Section } from "frontend/src/components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { renderPostList } from "../utils/renderPostList";
import { usePosts } from "../context/PostContext";
import { SOCIAL_LINKS } from "../constants";

export default function Home() {
  const { posts, loading } = usePosts();

  if (loading) return <p>Loading...</p>;

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
        {renderPostList(posts)}
      </Section>
    </Page>
  );
}
