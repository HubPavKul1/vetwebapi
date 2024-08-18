import { IReactElement } from "interfaces/BaseInterface";

interface MenuProps {
  children?: React.ReactElement | React.ReactNode;
  buttons?: IReactElement[];
}

export function Menu({ children, buttons }: MenuProps) {
  return (
    <div className="text-left p-4 border border-gray-800 rounded-md shadow-md mb-5">
      <div className="flex flex-col items-center w-full ">
        <h2 className="text-2xl text-center font-bold mb-4">Меню</h2>
        <ul className="p-0 flex flex-col">{children}</ul>
      </div>
      <div className="flex flex-col p-1">
        {buttons &&
          buttons.map((item) => (
            <div className="w-full mb-4" key={item.id}>
              {item.element}
            </div>
          ))}
      </div>
    </div>
  );
}
