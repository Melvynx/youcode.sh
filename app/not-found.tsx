import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage() {
  return (
    <Card className="mt-4 max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Not found</CardTitle>
        <CardDescription>This page does not exist</CardDescription>
      </CardHeader>
    </Card>
  );
}
