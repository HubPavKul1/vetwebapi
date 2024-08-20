import { IReactElement } from "interfaces/BaseInterface";

interface MenuProps {
  children?: React.ReactElement | React.ReactNode;
  buttons?: IReactElement[];
}

export function Menu({ children, buttons }: MenuProps) {
  return (
    <div className="page-menu">
      <div className="page-menu-top">
        <h2>Меню</h2>
        <ul>{children}</ul>
      </div>
      <div className="page-menu-buttons">
        {buttons &&
          buttons.map((item) => (
            <div className="w-full mb-2" key={item.id}>
              {item.element}
            </div>
          ))}
      </div>
    </div>
  );
}
