interface PageMenuButtonsBlockProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuButtonsBlock({ children }: PageMenuButtonsBlockProps) {
  return <div className="flex flex-col p-1 ">{children}</div>;
}
