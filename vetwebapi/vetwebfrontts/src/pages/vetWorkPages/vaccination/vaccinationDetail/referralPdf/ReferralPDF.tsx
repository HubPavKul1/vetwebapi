import { PDF } from "../../../../../components/PDF";
import { IVetWorkSchema } from "../../../../../interfaces/VetWorkInterfaces";
import { ReferralPDFHeader } from "./ReferralHeader";


interface ReferralPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ReferralPDF({ setPdf, data }: ReferralPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="referral.pdf">
      <ReferralPDFHeader data={data}/>
    </PDF>
  );
}
