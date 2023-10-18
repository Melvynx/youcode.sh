import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { ComponentType } from 'react';
import type { ZodRawShape, z } from 'zod';

export function withTypeSafeProps<T extends ZodRawShape>(
  Component: ComponentType<unknown>,
  schema: z.ZodObject<T>
) {
  const TypeSafeInnerComponent = (props: unknown) => {
    const safeProps = schema.safeParse(props);

    if (!safeProps.success) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Invalid props</CardTitle>
          </CardHeader>
        </Card>
      );
    }

    return <Component {...safeProps.data} />;
  };
  return TypeSafeInnerComponent;
}
