import { useId, useState } from "react"
import styles from "./FileUpload.module.scss"


export function FileUpload() {
    const id = useId()
    const [image, setImage] = useState(null)

    return (
        <label 
            htmlFor={id}
            className={styles.fileLabel}>
            <input 
                type="file" 
                id={id}
                hidden
                accept="image/*"
            />
            {image ?
                <img src={image} alt="" />
                :
            <img src="/drugsCard.jpg"/>
            }
 
        </label>
    )
}