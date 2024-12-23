import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFHeader } from "./ActPDFHeader";

import useActStore from "features/vetWork/stores/useActStore";
import { ActPDFFooter } from "../ActPDFFooter";

export function ActPDF() {
  const actClose = useActStore((state) => state.actClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <ActPDFHeader />
      <ActPDFBody />
      <ActPDFFooter />
    </PDFWrapper>
  );
}
