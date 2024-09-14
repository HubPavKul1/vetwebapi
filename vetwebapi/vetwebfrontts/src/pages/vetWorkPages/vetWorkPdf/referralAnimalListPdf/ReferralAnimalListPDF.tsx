import { PDFWrapper } from "components/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { ReferralAnimalListPDFBody } from "./ReferralAnimalListPDFBody";
import { ReferralAnimalListPDFHeader } from "./ReferralAnimalListPDFHeader";

interface ReferralAnimalListPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDF({
  setPdf,
  data,
}: ReferralAnimalListPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="referralAnimalList.pdf">
      <ReferralAnimalListPDFHeader data={data} />
      <ReferralAnimalListPDFBody data={data} />
    </PDFWrapper>
  );
}
