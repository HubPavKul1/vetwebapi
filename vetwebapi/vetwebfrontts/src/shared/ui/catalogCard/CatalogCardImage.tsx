import { Link } from "react-router-dom";

interface CatalogCardImageProps {
  itemDetailUrl: string;
  imgSrc: string;
  cardTitle: string;
}

export function CatalogCardImage({ ...props }: CatalogCardImageProps) {
  return (
    <Link className="h-12" to={props.itemDetailUrl}>
      <img
        className="w-24 hover:scale-125 transition-transform"
        src={props.imgSrc}
        alt={props.cardTitle}
      />
    </Link>
  );
}
