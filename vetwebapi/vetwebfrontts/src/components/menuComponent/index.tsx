
import styles from "./Menu.module.scss";

interface MenuProps {
  children?: React.ReactElement | React.ReactNode;
  buttons?: React.ReactElement[]
}

export function Menu({ children, buttons }: MenuProps) {
  return (
    <div className={styles.menuWrap}>
      <div className={styles.pageMenu}>
        <h2>Меню</h2>
        <ul>{children}</ul>
      </div>
      <div className={styles.buttonsSet}>
        {buttons && buttons.map(
          item => (
            <div>{item}</div>
          )
        )}
      </div>
    </div>
  );
}
