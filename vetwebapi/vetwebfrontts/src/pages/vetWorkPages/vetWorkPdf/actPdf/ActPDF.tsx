import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFFooter } from "./ActPDFFooter";
import { ActPDFHeader } from "./ActPDFHeader";

import useActStore from "features/vetWork/stores/useActStore";

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
