import { getAuth} from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { NextApiRequest } from 'next';

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    console.log("AUTH DID NOT WORK");
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  console.log(userId);

  return profile;
}
