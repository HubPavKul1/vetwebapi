import { IButtonProps } from "shared/model/ButtonInterface";

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
