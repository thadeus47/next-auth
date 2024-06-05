"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';

/**
 * Registers a new user with the provided email, password, and name.
 *
 * @param values - An object containing the user's email, password, and name.
 * @returns An object with either a `success` message or an `error` message.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  //confirm email is already exist
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email Already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await  generateVerificationToken(email);

  //TODO; Send verification token email

  return { success: "Confirmation email sent!" };
};
