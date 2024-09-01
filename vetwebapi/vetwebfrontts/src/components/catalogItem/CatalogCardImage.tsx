import { FileUpload } from "../FileUpload";
import { Link } from "react-router-dom";

interface CatalogCardImageProps {
  url: string;
  imgSrc?: string;
  cardTitle: string;
  fileUploadUrl?: string;
  invQueryName?: string
}

export function CatalogCardImage({ ...props }: CatalogCardImageProps) {
  return (
    <>
      {props.imgSrc ? (
        <Link className="h-12" to={props.url}>
          <img
            className="w-24 hover:scale-125 transition-transform"
            src={props.imgSrc}
            alt={props.cardTitle}
          />
        </Link>
      ) : (
        <div>
          {props.fileUploadUrl && props.invQueryName && (
            <FileUpload
              uploadUrl={props.fileUploadUrl}
              accept="image/*"
              mutationName="drugImage upload"
              invQueryName={props.invQueryName}
              iconSrc="/emptyImage.jpg"
            />
          )}
        </div>
      )}
    </>
  );
}
