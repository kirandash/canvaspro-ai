import { handlers } from "@/auth"; // Referring to the auth.ts we just created

// hijack the default GET, POST from next.js with our own from auth.js
export const { GET, POST } = handlers;
