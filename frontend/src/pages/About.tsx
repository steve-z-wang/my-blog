import { Page, PageTitle, Section } from "../components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SOCIAL_LINKS } from "../constants";

export default function About() {
  return (
    <Page>
      <PageTitle>About Me</PageTitle>

      <Section>
        <div className="prose max-w-none">
          <p>
            Hi, I'm <strong>Steve</strong> — I like{" "}
            <strong>building things from scratch</strong>.
          </p>
          <p>
            I'm currently a <strong>software engineer at Amazon</strong>. I
            realized I spent too much time drifting during college, so I started
            this blog to <strong>document my learning and side projects</strong>
            . After quitting social media last year, I rediscovered a lot of
            interests — especially in{" "}
            <strong>psychology, economics, technology, and AI</strong>.
          </p>
          <p>
            I love coding, especially when it challenges me. One of my proudest
            projects so far is{" "}
            <strong>building a SQL processing engine from scratch</strong>.
            Recently, I've been diving deeper into <strong>AI</strong>,
            particularly <strong>reinforcement learning</strong>.
          </p>
          <p>
            Outside of work and learning, I enjoy <strong>rock climbing</strong>
            , being in <strong>nature</strong>, and the occasional{" "}
            <strong>daydream</strong> :P.
          </p>
          <p className="italic">
            Thanks for stopping by — feel free to reach out if you’d like to{" "}
            <strong>collaborate on a project</strong>!
          </p>
        </div>
      </Section>

      <Section className="prose">
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

      <Section>
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
      </Section>

      <Section>
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
