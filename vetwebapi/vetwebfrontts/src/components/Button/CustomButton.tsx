import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./CustomButton.module.scss"

export function CustomButton ({disabled, onClick, title}: IButtonProps) {
    return (
        <button 
            className={styles.btnLarge}
            disabled={disabled}
            onClick={onClick}
        ><span className={styles.btnTitle}>{title}</span>
        </button>
    )
}