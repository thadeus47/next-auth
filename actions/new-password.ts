"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";  
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";


export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) { 
        return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }   

    const { password } = validatedFields.data;

    const exstingToken = await getPasswordResetTokenByToken(token);

    if(!exstingToken) {
        return { error: "Invalid token!" };
    }   

    const hasExpired = new Date(exstingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired" };
    }   

    const existingUser = await getUserByEmail(exstingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword,
        },
    });

    await db.passwordResetToken.delete({
        where: { id: exstingToken.id },
    });

    return { success: "Password updated!" };
}