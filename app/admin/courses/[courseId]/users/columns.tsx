'use client';

import { Typography } from '@/components/ui/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from '@/components/ui/loading';
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Menu, Settings } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { updateUserOnCourseStatus } from './user.action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  email: string;
  image: string;
  status: 'active' | 'cancelled';
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            {(row.getValue('email') as string).charAt(0).toUpperCase() ?? '?'}
          </AvatarFallback>
          {row.getValue('image') ? (
            <AvatarImage src={row.getValue('image')} />
          ) : null}
        </Avatar>
        <Typography variant="small">{row.getValue('email')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {row.getValue('status')}
        </Badge>
      );
    },
  },
  {
    header: 'Actions',
    cell: function Cell({ row }) {
      const params = useParams();

      const courseId = String(params?.courseId);
      const userId = row.original.id;

      const mutation = useMutation(async () => {
        await updateUserOnCourseStatus({
          courseId,
          userId,
          cancel: row.getValue('status') === 'active',
        });

        toast.success('User status updated');
      });

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Menu size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  mutation.mutate();
                }}
              >
                {mutation.isLoading ? <Loader size={12} /> : <Settings size={12} />}
                {row.getValue('status') === 'active' ? 'Cancel' : 'Activate'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
