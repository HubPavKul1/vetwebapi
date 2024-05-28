
import { FileUpload } from "../../fileUpload/FileUpload";
import { Link } from "react-router-dom";

import styles from "./CatalogCardHeader.module.scss";


interface CatalogItemHeaderProps {
    url: string;
    imgSrc?: string;
    cardTitle?: string;
    fileUploadUrl?: string
}

export function CatalogItemHeader({...props}: CatalogItemHeaderProps) {
  return (
    <>
      {props.imgSrc ? (
        <div className={styles.cardImageWrap}>
          <Link className={styles.cardImageLink} to={props.url}>
            <img
              className={styles.cardImage}
              src={`/${props.imgSrc}`}
              alt={props.cardTitle}
            />
          </Link>
        </div>
      ) : (
        <div className={styles.cardImageWrap}>
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
