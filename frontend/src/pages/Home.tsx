import { Page, PageTitle, Section } from "frontend/src/components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { renderPostList } from "../utils/renderPostList";
import { usePosts } from "../context/PostContext";
import { SOCIAL_LINKS } from "../constants";

export default function Home() {
  const { posts, loading } = usePosts();

  return (
    <Page className="flex flex-col">
      <PageTitle className="flex flex-col text-content">
        {/* Welcome */}
        <div>sw.log</div>

        {/* Description */}
        <span className="mt-4 text-muted text-sm font-medium">
          Hi, this is Steve. I'm documenting my learning and thoughts in this
          blog starting 2025.
        </span>

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
      </PageTitle>

      {/* Timeline Section */}
      {loading ? null : posts.length === 0 ? (
        <Section className="text-muted">
          No posts found. Check back later!
        </Section>
      ) : (
        <Section hasHorizontalPadding={false}>{renderPostList(posts)}</Section>
      )}
    </Page>
  );
}
