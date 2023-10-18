import type { Progress } from '@prisma/client';
import { CheckCircle, Circle, CircleDashed } from 'lucide-react';

export const getIconByProgress = (progress?: Progress) => {
  switch (progress) {
    case 'COMPLETED':
      return CheckCircle;
    case 'IN_PROGRESS':
      return Circle;
    default:
      return CircleDashed;
  }
};
