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
            Hi, I'm <strong>Steve</strong> — I enjoy building systems, exploring
            AI, and sharing what I learn here.
          </p>
          <p>
            Outside work, I love{" "}
            <strong>rock climbing, hiking, and reading</strong>. Always curious
            and eager to learn something new.
          </p>
          <p className="italic">
            Thanks for visiting — hope you find something interesting!
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
        </div>
      </Section>

      <Section>
        Found a bug?{" "}
        <a
          className="font-medium underline"
          href={`mailto:${SOCIAL_LINKS.EMAIL}`}
        >
          Email me
        </a>
        , thanks!
      </Section>
    </Page>
  );
}
