import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ReferralAnimalListPDFBody } from "./ReferralAnimalListPDFBody";
import { ReferralAnimalListPDFHeader } from "./ReferralAnimalListPDFHeader";
import { useGetVetWorkData } from "features/vetWork";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalListStore";

export function ReferralAnimalListPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const referralAnimalListClose = useReferralAnimalListStore(
    (set) => set.referralAnimalListClose
  );
  return (
    <PDFWrapper
      closePdf={referralAnimalListClose}
      filename="referralAnimalList.pdf"
    >
      <ReferralAnimalListPDFHeader data={data} />
      <ReferralAnimalListPDFBody data={data} />
    </PDFWrapper>
  );
}
