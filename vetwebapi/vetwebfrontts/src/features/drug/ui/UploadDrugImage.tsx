import { drugFileUploadUrl, FileUpload } from "shared/index";

interface UploadDrugImageProps {
  drugId: number;
  invQueryName: string;
}

export function UploadDrugImage({ ...props }: UploadDrugImageProps) {
  return (
    <div>
      <FileUpload
        uploadUrl={drugFileUploadUrl(props.drugId)}
        accept="image/*"
        mutationName="drugImage upload"
        invQueryName={props.invQueryName}
        iconSrc="/emptyImage.jpg"
      />
    </div>
  );
}
