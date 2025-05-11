import { SubscribeByEmailRequestSchema } from "@my-blog/common";

export async function subscribeByEmail(email: string): Promise<void> {
  const request = { email };
  try {
    SubscribeByEmailRequestSchema.parse(request); // Validate request
  } catch (error) {
    throw new Error(
      "Invalid email format. Please enter a valid email address."
    );
  }

  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Subscription failed.");
  }
}
