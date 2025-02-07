import { PDFWrapper } from "shared/ui/PDFWrapper";
import { useGetVetWorkData } from "features/vetWork";

import { BloodActPDFHeader } from "./BloodActPDFHeader";
import { BloodActPDFBody } from "./BloodActPDFBody";
import { ActPDFFooter } from "../ActPDFFooter";
import useBloodActStore from "features/vetWork/stores/useBloodActStore";
import { Container } from "react-bootstrap";

export function BloodActPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const actClose = useBloodActStore((state) => state.bloodActClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <Container className="pl-20 pr-5 py-5 font-serif text-lg">
        <BloodActPDFHeader />
        <BloodActPDFBody />
        <ActPDFFooter />
      </Container>
    </PDFWrapper>
  );
}
