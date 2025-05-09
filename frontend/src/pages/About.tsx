import { Page, Section } from "../components";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function About() {
  return (
    <Page>
      <Section>
        <div className="prose max-w-none">
          <h1>About Me</h1>
          <p>
            Hi, I'm <strong>Steve</strong> — a software engineer at{" "}
            <strong>Amazon</strong>. I enjoy building systems, exploring AI, and
            sharing what I learn here.
          </p>
          <p>
            Outside work, I love{" "}
            <strong>rock climbing, hiking, and reading</strong>. I'm also
            passionate about <strong>finance, social security, economics, and business</strong>. 
            Always curious and eager to learn something new.
          </p>
          <p className="text-gray-600 italic">
            Thanks for visiting — hope you find something interesting!
          </p>
          <h2>Connect With Me</h2>
          <ul className="flex space-x-4 not-prose">
            <li>
              <a
                href="https://www.linkedin.com/in/stevewang2000/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
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
              <a
                href="https://github.com/steve-z-wang"
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
    </Page>
  );
}
