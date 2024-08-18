import { IButtonProps } from "interfaces/ButtonInterface";

export function CustomButton({
  disabled,
  onClick,
  title,
  className,
}: IButtonProps) {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      <span>{title}</span>
    </button>
  );
}
