import { IButtonProps } from "../../interfaces/ButtonInterface"

import styles from "./AddObjectBtn.module.css"


export function AddObjectBtn({...props}: IButtonProps) {

  return (
    
        <button className={styles.addObjBtn} onClick={props.onClick}>
            {props.title}
        </button>
    
  )
}
