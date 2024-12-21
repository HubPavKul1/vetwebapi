import { PDFWrapper } from "shared/ui/PDFWrapper";
import { useGetVetWorkData } from "features/vetWork";
import useBloodActStore from "features/vetWork/stores/useBloodActStore";
import { BloodActPDFHeader } from "./BloodActPDFHeader";
import { BloodActPDFBody } from "./BloodActPDFBody";
import { BloodActPDFFooter } from "./BloodActPDFFooter";

export function BloodActPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const actClose = useBloodActStore((state) => state.bloodActClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <BloodActPDFHeader />
      <BloodActPDFBody />
      <BloodActPDFFooter />
    </PDFWrapper>
  );
}
