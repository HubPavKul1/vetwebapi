import { PDF } from "../../../../components/PDF";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { ReferralPDFBody } from "./ReferralPDFBody";
import { ReferralPDFHeader } from "./ReferralPDFHeader";

interface ReferralPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ReferralPDF({ setPdf, data }: ReferralPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="referral.pdf">
      <ReferralPDFHeader data={data} />
      <ReferralPDFBody data={data} />
    </PDF>
  );
}
