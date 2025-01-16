import { Link } from "react-router-dom";

interface CatalogCardImageProps {
  itemDetailUrl: string;
  imgSrc: string;
  cardTitle: string;
}

export function CatalogCardImage({ ...props }: CatalogCardImageProps) {
  return (
      <Link to={props.itemDetailUrl}>
        <img
          className="w-20 hover:scale-110 transition-transform duration-300 ease-in-out"
          src={props.imgSrc}
          alt={props.cardTitle}
        />
      </Link>
  );
}
