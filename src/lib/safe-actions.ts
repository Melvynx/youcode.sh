import { getAuthSession } from '@/lib/next-auth';
import { createSafeActionClient } from 'next-safe-action';

/**
 * ActionError message will be returned to the client.
 * You can use it to display a message to the user.
 *
 *
 * @param message Error message.
 */
export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActionError';
  }
}

// This function will be called when our actions throw error.
const handleServerError = (error: unknown): { serverError: string } => {
  if (error instanceof ActionError) {
    return {
      serverError: error.message,
    };
  }

  return {
    // The default error, in case we don't know what happened.
    serverError: 'Something went wrong!',
  };
};
export const action = createSafeActionClient({
  handleReturnedServerError: handleServerError,
});

export const authenticatedAction = createSafeActionClient({
  handleReturnedServerError: handleServerError,
  async middleware() {
    const session = await getAuthSession();

    const userId = session?.user.id;

    if (!userId) {
      throw new ActionError("You're not logged in. Please log in to continue.");
    }

    return {
      userId,
    };
  },
});
