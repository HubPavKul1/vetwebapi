import { ButtonProps } from "react-bootstrap";
import { CustomButton } from "./CustomButton";

export function ButtonSubmit({ title }: ButtonProps) {
  return (
    <CustomButton
      className="w-full px-5 py-2 border border-slate-500 rounded-md text-lg text-indigo-900 uppercase font-bold hover:bg-slate-400 transition-colors duration-300 ease-in-out focus:border-slate-700 active:border-slate-700"
      disabled={false}
      title={title}
    />
  );
}
