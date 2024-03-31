import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./CustomButton.module.scss"

export function CustomButton ({disabled, onClick, title}: IButtonProps) {
    return (
        <button 
            className={styles.btn}
            disabled={disabled}
            onClick={onClick}
        >{title}
        </button>
    )
}