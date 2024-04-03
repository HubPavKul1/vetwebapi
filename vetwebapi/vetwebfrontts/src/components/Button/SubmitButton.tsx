import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./CustomButton.module.scss"

export function SubmitButton ({disabled, onClick, title}: IButtonProps) {
    return (
        <button 
            className={styles.btnSubmit}
            disabled={disabled}
            onClick={onClick}
        ><span className={styles.btnTitle}>{title}</span>
        </button>
    )
}