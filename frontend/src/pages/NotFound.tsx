import { Page, Section } from "../components";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Page>
      <Section className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted mt-8">Page not found</p>
        <p className="mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="font-medium underline"
          >
            Back to Home
          </Link>
        </div>
      </Section>
    </Page>
  );
}
