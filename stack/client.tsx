import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/sign-in",
    afterSignIn: "/dashboard",
    afterSignOut: "/",
    home: "/dashboard",
  },
});
