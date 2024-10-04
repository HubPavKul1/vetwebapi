import { Container } from "react-bootstrap";
import { FileUpload, vetWorkFileUploadUrl } from "shared/index";

interface UploadFileMenuItemProps {
  vetWorkId: number;
  id: string;
}

export function UploadFileMenuItem({ ...props }: UploadFileMenuItemProps) {
  const { vetWorkId, id } = props;
  return (
    <Container className="flex justify-center items-center w-full pt-2 pb-4  border-2 border-violet-400 rounded-md text-lg text-violet-400 uppercase font-bold">
      <div>Загрузите документ</div>
      <div>
        <FileUpload
          uploadUrl={vetWorkFileUploadUrl(vetWorkId)}
          accept=".pdf"
          mutationName="uploadVetWorkFile"
          invQueryName="vetwork"
          fontSize={40}
          color="violet"
          id={id}
        />
      </div>
    </Container>
  );
}
