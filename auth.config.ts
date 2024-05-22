import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"


// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [],
} satisfies NextAuthConfig