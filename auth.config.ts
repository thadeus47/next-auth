import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";


// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      /**
       * Authorizes a user by validating their credentials.
       *
       * @param credentials - The user's credentials, including email and password.
       * @returns The authenticated user if the credentials are valid, or `null` if they are invalid.
       */
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    })
  ],
} satisfies NextAuthConfig