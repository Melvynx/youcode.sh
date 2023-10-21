import { ButtonWithLoadingState } from '@/components/rsc/ButtonWithLoadingState';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { wait } from '@/lib/wait';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div className="max-w-md m-auto flex flex-col gap-2">
      {users.map((user) => (
        <form key={user.id}>
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardFooter>
              <ButtonWithLoadingState
                formAction={async () => {
                  'use server';

                  // vérifier que l'utilisateur à le droit de supprimer

                  await prisma.user.delete({
                    where: {
                      id: user.id,
                    },
                  });

                  await wait(1000);

                  revalidatePath('/demo');
                }}
                variant="secondary"
              >
                Delete
              </ButtonWithLoadingState>
            </CardFooter>
          </Card>
        </form>
      ))}
    </div>
  );
}
