import { Link } from "react-router-dom";


import styles from "./CatalogGardTitle.module.scss"

interface CatalogCardTitleProps {
    url: string;
    cardTitle: string;
}

export function CatalogCardTitle({url, cardTitle}: CatalogCardTitleProps) {
  return (
    <>
      <Link to={url}>
        <h5 className={styles.cardTitle}>{cardTitle}</h5>
      </Link>
    </>
  );
}
