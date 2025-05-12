import { Page, PageTitle, Section } from "../components";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Page>
      <PageTitle className="flex flex-col items-center">
        <div>404</div>
        <div className="mt-4 text-2xl text-muted">Page Not Found</div>
      </PageTitle>

      <Section className="text-center">
        The page you're looking for doesn't exist or has been moved.
      </Section>

      <Section className="text-center">
        <Link to="/" className="font-medium underline">
          Back to Home
        </Link>
      </Section>
    </Page>
  );
}
