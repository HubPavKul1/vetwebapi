import { PDF } from "../../../../components/pdf";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { ReferralAnimalListPDFBody } from "./ReferralAnimalListPDFBody";
import { ReferralAnimalListPDFHeader } from "./ReferralAnimalListPDFHeader";


interface ReferralAnimalListPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDF({ setPdf, data }: ReferralAnimalListPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="referralAnimalList.pdf">
        <ReferralAnimalListPDFHeader data={data}/>
        <ReferralAnimalListPDFBody data={data} />
    </PDF>
  );
}
