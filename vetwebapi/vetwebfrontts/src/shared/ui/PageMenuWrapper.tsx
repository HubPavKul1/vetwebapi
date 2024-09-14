interface PageMenuWrapperProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuWrapper({ children }: PageMenuWrapperProps) {
  return <div className="page-menu">{children}</div>;
}
