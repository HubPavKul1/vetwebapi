import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ReferralAnimalListPDFBody } from "./ReferralAnimalListPDFBody";
import { ReferralAnimalListPDFHeader } from "./ReferralAnimalListPDFHeader";
import { useGetVetWorkData } from "features/vetWork";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalListStore";
import { Container } from "react-bootstrap";

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
      <Container className="pl-20 pr-5 py-5">
        <ReferralAnimalListPDFHeader data={data} />
        <ReferralAnimalListPDFBody data={data} />
      </Container>
    </PDFWrapper>
  );
}
