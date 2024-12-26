import { IBase } from "shared/model/BaseInterfaces";

interface FilterButtonProps {
  item: IBase;
  clickFunc: CallableFunction;
}

export function FilterButton({ item, clickFunc }: FilterButtonProps) {
  const clickHandler = () => {
    clickFunc(item.id);
  };
  return (
    <button className="btn-filter" onClick={() => clickHandler()}>
      {item.name}
    </button>
  );
}
