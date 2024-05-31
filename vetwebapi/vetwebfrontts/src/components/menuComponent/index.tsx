import styles from "./Menu.module.scss";

interface MenuProps {
  children?: React.ReactElement | React.ReactNode;
}

export function Menu({children}: MenuProps) {


  return(
      <div className={styles.MenuWrap}>
        <div className={styles.PageMenu}>
            <h2>Меню</h2>
            <ul>
              {children}
            </ul>
          </div>
      </div>
          
    )
}