import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) {
        console.log("AUTH DNOT WORK");
        return null;
    }

    const profile =  await db.profile.findUnique({
        where : {
            userId
        }
    });

    console.log(userId);

    return profile;
}
