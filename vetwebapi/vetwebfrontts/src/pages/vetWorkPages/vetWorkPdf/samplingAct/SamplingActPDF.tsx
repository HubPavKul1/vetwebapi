import { PDFWrapper } from "shared/ui/PDFWrapper";
import useSamplingActStore from "features/vetWork/stores/useSamplingActStore";
import { useGetVetWorkData } from "features/vetWork";
import { ActPDFFooter } from "../actPdf/ActPDFFooter";
import { SamplingActPDFHeader } from "./SamplingActPDFHeader";

export function SamplingActPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const actClose = useSamplingActStore((state) => state.samplingActClose);

  return (
    <PDFWrapper closePdf={actClose} filename="act.pdf">
      <SamplingActPDFHeader />
      <ActPDFFooter />
    </PDFWrapper>
  );
}
