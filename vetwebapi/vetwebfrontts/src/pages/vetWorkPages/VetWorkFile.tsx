import useVetWorkFileStore from "features/vetWork/stores/useVetWorkFileStore";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { vetWorkFileUrl } from "shared/urls/vetWorkUrls";

export function VetWorkFile() {
  const { id } = useParams();
  const vetWorkId = Number(id);
  const fileClose = useVetWorkFileStore((state) => state.fileClose);

  return (
    <Container className="pt-1">
      <button
        type="button"
        className="btn-upload mb-2"
        onClick={() => fileClose()}
      >
        НАЗАД
      </button>
      <object
        type="application/pdf"
        data={vetWorkFileUrl(vetWorkId)}
        width="100%"
        className="min-h-screen"
      ></object>
    </Container>
  );
}
