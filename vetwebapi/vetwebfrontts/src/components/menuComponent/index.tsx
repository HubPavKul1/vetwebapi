
import { IReactElement } from "../../interfaces/BaseInterface";
import styles from "./Menu.module.scss";



interface MenuProps {
  children?: React.ReactElement | React.ReactNode;
  buttons?: IReactElement[]
}

export function Menu({ children, buttons }: MenuProps) {
  return (
    <div className={styles.menuWrap}>
      <div className={styles.pageMenu}>
        <h2 className="text-2xl text-center font-bold mb-4">Меню</h2>
        <ul>{children}</ul>
      </div>
      <div className={styles.buttonsSet}>
        {buttons && buttons.map(
          item => (
            <div key={item.id}>{item.element}</div>
          )
        )}
      </div>
    </div>
  );
}
