import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./CustomButton.module.scss"

export function ButtonNav ({disabled, onClick, title}: IButtonProps) {
    return (
        <button 
            className={styles.btnNav}
            disabled={disabled}
            onClick={onClick}
        ><span className={styles.btnTitle}>{title}</span>
        </button>
    )
}