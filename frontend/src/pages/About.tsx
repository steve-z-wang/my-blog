import { Page, PageTitle, Section } from "../components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SOCIAL_LINKS } from "../constants";

export default function About() {
  return (
    <Page>
      <PageTitle>About Me</PageTitle>

      <Section className="prose max-w-none">
        <p>Hi, I’m Steve. I like building things from scratch.</p>

        <p>
          I like great products and design, and my passion lies in using technology to improve humans’ quality of life. So I started this blog to document my learning journey and share the projects I’m working on.
        </p>

        <p>
          I work as a software engineer at Amazon. Outside of work, I’m an avid reader with interests spanning psychology, economics, and tech. I also enjoy spending time in nature and the occasional daydreaming session.
        </p>

        <p className="italic">
Thanks for stopping by — feel free to reach out if you’d like to collaborate on a project!
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
          This blog is built with React and Express.js. Source code is on{" "}
          <a
            className="font-medium underline"
            href="https://github.com/steve-z-wang/my-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . Found a bug?{" "}
          <a
            className="font-medium underline"
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
          >
            Let me know
          </a>
          !
        </p>
      </Section>
    </Page>
  );
}
