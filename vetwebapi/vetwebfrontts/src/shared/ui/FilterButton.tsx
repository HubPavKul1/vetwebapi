import { IBase } from "shared/model/BaseInterfaces";

interface FilterButtonProps {
  item: IBase;
  clickFunc: CallableFunction;
  activeId: number;
}

export function FilterButton({ item, clickFunc, activeId }: FilterButtonProps) {
  const clickHandler = () => {
    clickFunc(item.id);
  };
  return (
    <button
      className={
        activeId === item.id ? "btn-filter-active" : "btn-filter"
      }
      onClick={() => clickHandler()}
    >
      {item.name}
    </button>
  );
}
