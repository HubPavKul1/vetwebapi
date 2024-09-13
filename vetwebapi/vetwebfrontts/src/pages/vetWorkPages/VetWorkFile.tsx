import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { vetWorkFileUrl } from "shared/urls/vetWorkUrls";

interface VetWorkFileProps {
  setPdf: CallableFunction;
}
export function VetWorkFile({ setPdf }: VetWorkFileProps) {
  const { id } = useParams();
  const vetWorkId = Number(id);

  return (
    <Container className="pt-1">
      <button
        type="button"
        className="btn-upload mb-2"
        onClick={() => setPdf(false)}
      >
        НАЗАД
      </button>
      <object
        type="application/pdf"
        data={vetWorkFileUrl(vetWorkId)}
        width="100%"
        height={400}
      ></object>
    </Container>
  );
}
