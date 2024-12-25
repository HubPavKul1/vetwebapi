interface FilterButtonProps {
  title: string;
  clickFunc: CallableFunction;
}

export function FilterButton({ title, clickFunc }: FilterButtonProps) {
  const clickHandler = () => {
    clickFunc(title);
  };
  return (
    <button className="btn-filter" onClick={() => clickHandler()}>
      {title}
    </button>
  );
}
