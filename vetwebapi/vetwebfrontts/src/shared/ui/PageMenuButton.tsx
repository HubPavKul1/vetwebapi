interface PageMenuButtonProps {
  title: string;
}

export function PageMenuButton({ title }: PageMenuButtonProps) {
  return (
    <button type="button" className="">
      {title}
    </button>
  );
}
