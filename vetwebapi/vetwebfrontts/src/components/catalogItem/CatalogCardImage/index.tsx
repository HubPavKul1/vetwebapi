
import { FileUpload } from "../../fileUpload/FileUpload";
import { Link } from "react-router-dom";

import styles from "./CatalogCardImage.module.scss";


interface CatalogCardImageProps {
    url: string;
    imgSrc?: string;
    cardTitle: string;
    fileUploadUrl?: string
}

export function CatalogCardImage({...props}: CatalogCardImageProps) {
  return (
    <>
      {props.imgSrc ? (
        // <div className={styles.cardImageWrap}>
          <Link className={styles.cardImageLink} to={props.url}>
            <img
              className={styles.cardImage}
              src={`/${props.imgSrc}`}
              alt={props.cardTitle}
            />
          </Link>
        // </div>
      ) : (
        <div >
          {props.fileUploadUrl && (
            <FileUpload
              uploadUrl={props.fileUploadUrl}
              accept="image/*"
              mutationName="drugImage upload"
              invQueryName="drugs"
              imgSrc="/emptyImage.jpg"
            />
          )}
        </div>
      )}
    </>
  );
}
