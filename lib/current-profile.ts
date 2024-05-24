import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    console.log("AUTH DID NOT WORK");
    return null;
  }

  const userId = user.id;

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  console.log(userId);

  return profile;
}
