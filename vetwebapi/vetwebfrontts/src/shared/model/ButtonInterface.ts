import { MouseEventHandler } from "react";

export interface IButtonProps {
  id?: string;
  as?: object;
  to?: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
}
