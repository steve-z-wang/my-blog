import { Page, PageTitle, Section } from "../components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SOCIAL_LINKS } from "../constants";

export default function About() {
  return (
    <Page>
      <PageTitle>About Me</PageTitle>

      <Section className="prose max-w-none">
        <p>
          Hi, I'm <strong>Steve</strong>. I like coding and building things from
          scratch.
        </p>

        <p>
          I work as a software engineer at Amazon. I started this blog to share
          what I'm learning and the projects I'm working on. Lately, I've been
          into <strong>compilers</strong>, so expect more posts on that.
        </p>

        <p>I'm also into psychology, economics, and tech in general.</p>

        <p>
          Outside of work, I enjoy rock climbing, nature, and the occasional
          daydream. :)
        </p>

        <p className="italic">
          Thanks for stopping by — feel free to reach out if you'd like to
          collaborate on a project!
        </p>

        <h2>Connect With Me</h2>
        <ul className="flex space-x-4 not-prose">
          <li>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} aria-label="Email">
              <FiMail className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.GITHUB}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </Section>

      {/* additional info */}
      <Section className="prose max-w-none">
        <p>
          Found a bug?{" "}
          <a
            className="font-medium underline"
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
          >
            Email me
          </a>
          , thanks!
        </p>
        <p>
          This blog is built with <strong>React</strong>,{" "}
          <strong>Express</strong>, and <strong>SQLite</strong>. You can check
          out the source code on{" "}
          <a
            className="font-medium underline"
            href="https://github.com/steve-z-wang/my-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </Section>
    </Page>
  );
}
