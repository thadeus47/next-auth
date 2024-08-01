'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { SettingsSchema } from '@/schemas';

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!user.id) {
        return { error: "User ID not found" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized!" }
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            ...values
        }
    });

    return { success: "Settings updated!" }
}