interface PageMenuTopProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuTop({ children }: PageMenuTopProps) {
  return (
    <div className="page-menu-top">
      <h2>Меню</h2>
      <ul>{children}</ul>
    </div>
  );
}
