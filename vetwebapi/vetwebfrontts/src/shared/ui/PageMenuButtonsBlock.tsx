interface PageMenuButtonsBlockProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuButtonsBlock({ children }: PageMenuButtonsBlockProps) {
  return <div className="page-menu-buttons">{children}</div>;
}
