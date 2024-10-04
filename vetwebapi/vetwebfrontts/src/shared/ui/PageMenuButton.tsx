import { CustomButton } from "./CustomButton";

interface PageMenuButtonProps {
  title: string;
  showContent: CallableFunction;
}

export function PageMenuButton({ ...props }: PageMenuButtonProps) {
  const { title, showContent } = props;
  return (
    <CustomButton
      className="btn-submit mb-2"
      title={title}
      onClick={() => showContent(true)}
    />
  );
}
