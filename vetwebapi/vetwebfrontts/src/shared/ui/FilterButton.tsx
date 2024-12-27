import { IBase } from "shared/model/BaseInterfaces";

interface FilterButtonProps {
  item: IBase | {id: boolean, name: string};
  clickFunc: CallableFunction;
  activeId: number | boolean | undefined;
}

export function FilterButton({ item, clickFunc, activeId }: FilterButtonProps) {
  return (
    <button
      className={activeId === item.id ? "btn-filter-active" : "btn-filter"}
      onClick={() => clickFunc()}
    >
      {item.name}
    </button>
  );
}
