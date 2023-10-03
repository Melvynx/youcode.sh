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
import { ColumnDef } from '@tanstack/react-table';
import { Menu } from 'lucide-react';

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
    cell: ({ row }) => <Badge>{row.getValue('status')}</Badge>,
  },

  {
    header: 'Actions',
    cell: ({ row }) => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="sm" variant="secondary">
              <Menu size={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Refund</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
