
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config"

// export const { GET, POST } = handlers
/**
 * Configures the NextAuth.js authentication middleware for the application.
 * This code sets up the handlers for the GET and POST routes, as well as the authentication configuration.
 * The Prisma adapter is used to interact with the database, and the session strategy is set to "jwt".
 * The additional authentication configuration is provided through the `authConfig` object.
 */
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
