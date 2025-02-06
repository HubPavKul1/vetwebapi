import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFHeader } from "./ActPDFHeader";

import useActStore from "features/vetWork/stores/useActStore";
import { ActPDFFooter } from "../ActPDFFooter";
import { Container } from "react-bootstrap";

export function ActPDF() {
  const actClose = useActStore((state) => state.actClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <Container className="pl-20 pr-5 py-5">
        <ActPDFHeader />
        <ActPDFBody />
        <ActPDFFooter />
      </Container>
    </PDFWrapper>
  );
}
