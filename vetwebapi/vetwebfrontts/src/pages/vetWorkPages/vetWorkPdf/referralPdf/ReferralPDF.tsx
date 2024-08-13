import { PDFWrapper } from "../../../../components/PDFWrapper";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { ReferralPDFBody } from "./ReferralPDFBody";
import { ReferralPDFBodyNoBlood } from "./ReferralPDFBodyNoBlood";
import { ReferralPDFFooter } from "./ReferralPDFFooter";
import { ReferralPDFHeader } from "./ReferralPDFHeader";

interface ReferralPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ReferralPDF({ setPdf, data }: ReferralPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="referral.pdf">
      <ReferralPDFHeader data={data} />
      {data.biomaterial === ("сыворотка крови" || "цельная кровь") ? (
        <ReferralPDFBody data={data} />
      ) : (
        <ReferralPDFBodyNoBlood data={data} />
      )}

      <ReferralPDFFooter data={data} />
    </PDFWrapper>
  );
}
