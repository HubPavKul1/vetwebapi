import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ReferralPDFBody } from "./ReferralPDFBody";
import { ReferralPDFBodyNoBlood } from "./ReferralPDFBodyNoBlood";
import { ReferralPDFFooter } from "./ReferralPDFFooter";
import { ReferralPDFHeader } from "./ReferralPDFHeader";
import { useGetVetWorkData } from "features/vetWork";
import useReferralStore from "features/vetWork/stores/useReferralStore";
import { BIOMATERIAL } from "shared/constants/vetworkConst";
import { Container } from "react-bootstrap";

export function ReferralPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const referralClose = useReferralStore((set) => set.referralClose);

  return (
    <PDFWrapper closePdf={referralClose} filename="referral.pdf">
      <Container className="pl-20 pr-5 py-5 font-serif text-lg">
        <ReferralPDFHeader data={data} />
        {data.biomaterial === (BIOMATERIAL.bloodSerum || BIOMATERIAL.blood) ? (
          <ReferralPDFBody data={data} />
        ) : (
          <ReferralPDFBodyNoBlood data={data} />
        )}

        <ReferralPDFFooter data={data} />
      </Container>
    </PDFWrapper>
  );
}
