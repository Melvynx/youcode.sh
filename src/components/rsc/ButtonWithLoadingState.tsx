'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

export const ButtonWithLoadingState = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={props.disabled || pending} />;
};
