import { getAuthSession } from '@/auth/next-auth';
import { createSafeActionClient } from 'next-safe-action';

export const action = createSafeActionClient({});

export const authenticatedAction = createSafeActionClient({
  async middleware() {
    const session = await getAuthSession();

    const userId = session?.user.id;

    if (!userId) {
      throw new Error("You're not logged in. Please log in to continue.");
    }

    return {
      userId,
    };
  },
});
