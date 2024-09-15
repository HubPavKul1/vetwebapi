import { Link } from "react-router-dom";

interface CatalogCardTitleProps {
  itemDetailUrl: string;
  cardTitle: string;
}

export function CatalogCardTitle({ itemDetailUrl, cardTitle }: CatalogCardTitleProps) {
  return (
    <>
      <Link to={itemDetailUrl}>
        <h5 className="card-title">{cardTitle}</h5>
      </Link>
    </>
  );
}
