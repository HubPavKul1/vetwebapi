import { CustomButton } from "./buttons/CustomButton";

interface PageMenuButtonProps {
  title: string;
  showContent: CallableFunction;
}

export function PageMenuButton({ ...props }: PageMenuButtonProps) {
  const { title, showContent } = props;
  return (
    <CustomButton
      className="w-full list-none m-0 mb-4 px-10 py-2 rounded-lg shadow-md bg-slate-300 text-lg uppercase font-bold text-indigo-900 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
      title={title}
      onClick={() => showContent()}
    />
  );
}
