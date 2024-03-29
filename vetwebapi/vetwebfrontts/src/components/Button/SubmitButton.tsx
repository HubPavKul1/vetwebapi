import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./SubmitButton.module.css"

export function SubmitButton ({disabled, onClick, title}: IButtonProps) {
    return (
        <button 
            className={styles.submitBtn}
            disabled={disabled}
            onClick={onClick}
        >{title}
        </button>
    )
}