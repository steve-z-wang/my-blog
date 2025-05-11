import { useRef } from "react";
import {
  Button,
  Input,
  Page,
  Section,
  useNotification,
  Form,
} from "../components";
import { subscribeByEmail } from "../utils/api";

interface SubscribeProps {}

export default function Subscribe({}: SubscribeProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    const email = emailRef.current?.value.trim() || "";

    if (!email) {
      showNotification("Please enter your email", "error");
      return;
    }

    try {
      await subscribeByEmail(email);
      showNotification("Subscribed successfully!", "success");
      if (emailRef.current) {
        emailRef.current.value = "";
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      showNotification(errorMessage, "error");
    }
  };

  return (
    <Page>
      <Section>
        <h1 className="text-4xl font-bold">Subscribe</h1>

        <div className="mt-4">
          <Form onSubmit={handleSubmit}>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Your email"
              required
            />
            <Button type="submit" bgColor="surfaceAlt" className="text-text">
              Subscribe
            </Button>
          </Form>
        </div>
      </Section>
    </Page>
  );
}
