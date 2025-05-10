import { useRef } from "react";
import { Button, Input, Page, Section, useNotification } from "../components";

interface SubscribeProps {}

export default function Subscribe({}: SubscribeProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();

  const handleSubscribe = async () => {
    const email = emailRef.current?.value.trim() || "";

    if (!email) {
      showNotification("Please enter your email", "error");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showNotification("Subscribed successfully!", "success");
        if (emailRef.current) {
          emailRef.current.value = "";
        }
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || "Subscription failed.", "error");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  return (
    <Page>
      <Section>
        <h1 className="text-4xl font-bold">Subscribe</h1>

        <div className="mt-4">
          <div className="">
            <Input
              ref={emailRef}
              type="email"
              placeholder="Your email"
              required
            />
            <div className="mt-4">
              <Button
                onClick={handleSubscribe}
                bgColor="muted"
                className="text-surface"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
