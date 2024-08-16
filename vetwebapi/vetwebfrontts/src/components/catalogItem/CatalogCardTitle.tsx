import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CatalogCardTitleProps {
  url: string;
  cardTitle: string;
}

export function CatalogCardTitle({ url, cardTitle }: CatalogCardTitleProps) {
  return (
    <>
      <Link to={url}>
        <h5 className="text-sm text-center cursor-pointer hover:text-violet-600 transition-colors font-bold">
          {cardTitle}
        </h5>
      </Link>
    </>
  );
}
