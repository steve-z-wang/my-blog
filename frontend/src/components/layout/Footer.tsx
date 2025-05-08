import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center p-4">
      <p className="text-muted text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Link className="underline" to="/">
          sw.log.
        </Link>{" "}
        All rights reserved.
      </p>
    </footer>
  );
}
