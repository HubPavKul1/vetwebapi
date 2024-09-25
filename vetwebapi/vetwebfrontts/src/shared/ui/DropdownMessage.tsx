import clsx from "clsx";

interface DropdownMessageProps {
  isOpen: boolean;
  message: string;
}

export function DropdownMessage({ ...props }: DropdownMessageProps) {
  const { isOpen, message } = props;
  return (
    <div
      className={clsx(
        "absolute top-10 right-8 p-3 w-32 border rounded-md bg-white shadow-md text-center",
        !isOpen && "hidden"
      )}
    >
      {message}
    </div>
  );
}
