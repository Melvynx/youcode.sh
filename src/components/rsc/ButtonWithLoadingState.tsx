"use client";

import { useFormStatus } from "react-dom";
import type { ButtonProps } from "../ui/button";
import { Button } from "../ui/button";

export const ButtonWithLoadingState = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={props.disabled ?? pending} />;
};
