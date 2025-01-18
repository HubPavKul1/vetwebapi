import { ButtonProps } from "react-bootstrap";
import { CustomButton } from "./CustomButton";

export function ButtonCreate({ title, onClick, disabled }: ButtonProps) {
  return (
    <CustomButton
      className="w-full px-5 py-2 mb-2 border border-slate-400 rounded-lg drop-shadow-xl shadow-slate-900 text-sm text-indigo-900 uppercase font-bold hover:bg-slate-400 transition-colors duration-300 ease-in-out focus:border-slate-700 active:border-slate-700"
      disabled={disabled}
      title={title}
      onClick={onClick}
    />
  );
}
