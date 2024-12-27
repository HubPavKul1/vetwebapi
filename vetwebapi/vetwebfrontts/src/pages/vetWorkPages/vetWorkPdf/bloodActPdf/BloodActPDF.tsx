import { PDFWrapper } from "shared/ui/PDFWrapper";
import { useGetVetWorkData } from "features/vetWork";

import { BloodActPDFHeader } from "./BloodActPDFHeader";
import { BloodActPDFBody } from "./BloodActPDFBody";
import { ActPDFFooter } from "../ActPDFFooter";
import useBloodActStore from "features/vetWork/stores/useBloodActStore";

export function BloodActPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const actClose = useBloodActStore((state) => state.bloodActClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <BloodActPDFHeader />
      <BloodActPDFBody />
      <ActPDFFooter />
    </PDFWrapper>
  );
}
