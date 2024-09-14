import { Link } from "react-router-dom";

interface CatalogCardTitleProps {
  url: string;
  cardTitle: string;
}

export function CatalogCardTitle({ url, cardTitle }: CatalogCardTitleProps) {
  return (
    <>
      <Link to={url}>
        <h5 className="card-title">{cardTitle}</h5>
      </Link>
    </>
  );
}
