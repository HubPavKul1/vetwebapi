import { PDF } from "../../../../components/PDF";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { AnimalsListPDFBody } from "./AnimalsListPDFBody";
import { AnimalsListPDFFooter } from "./AnimalsListPDFFooter";
import { AnimalsListPDFHeader } from "./AnimalsListPDFHeader";

interface AnimalsListPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function AnimalsListPDF({ setPdf, data }: AnimalsListPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="animalsList.pdf">
      <AnimalsListPDFHeader data={data} />
      <AnimalsListPDFBody data={data} />
      <AnimalsListPDFFooter />
    </PDF>
  );
}
