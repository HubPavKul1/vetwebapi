import { PDFWrapper } from "components/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { AnimalsListPDFBody } from "./AnimalsListPDFBody";
import { AnimalsListPDFFooter } from "./AnimalsListPDFFooter";
import { AnimalsListPDFHeader } from "./AnimalsListPDFHeader";

interface AnimalsListPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function AnimalsListPDF({ setPdf, data }: AnimalsListPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="animalsList.pdf">
      <AnimalsListPDFHeader data={data} />
      <AnimalsListPDFBody data={data} />
      <AnimalsListPDFFooter />
    </PDFWrapper>
  );
}
