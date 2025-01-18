import { Container } from "react-bootstrap";
import { FileUpload, vetWorkFileUploadUrl } from "shared/index";

interface UploadFileMenuItemProps {
  vetWorkId: number;
}
export function UploadFileMenuItem({ vetWorkId }: UploadFileMenuItemProps) {
  const id = vetWorkId.toString();
  const queryKey = "vetwork";

  return (
    <Container className="flex justify-center items-center w-full pt-2 pb-8 mb-2 shadow-md rounded-md text-lg text-indigo-900 uppercase font-bold">
      <div>Загрузите документ</div>
      <div>
        <FileUpload
          uploadUrl={vetWorkFileUploadUrl(vetWorkId)}
          accept=".pdf"
          mutationName="uploadVetWorkFile"
          invQueryName={queryKey}
          fontSize={40}
          color="indigo"
          id={id}
        />
      </div>
    </Container>
  );
}
