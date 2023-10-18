import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CourseCardPlaceholder = () => {
  return (
    <Card className="hover:bg-muted transition-colors">
      <CardHeader className="flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-9 w-28" />
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{'?'}</AvatarFallback>
            </Avatar>
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
        <Skeleton className="h-10 w-10" />
      </CardHeader>
    </Card>
  );
};
