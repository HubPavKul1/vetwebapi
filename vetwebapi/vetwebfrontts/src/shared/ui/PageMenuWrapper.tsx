interface PageMenuWrapperProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuWrapper({ children }: PageMenuWrapperProps) {
  return (
    <div className="text-left px-8 py-4 mb-5 border rounded-lg shadow-md">
      {children}
    </div>
  );
}
