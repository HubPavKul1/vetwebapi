import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { AnimalsListPDFBody } from "./AnimalsListPDFBody";
import { AnimalsListPDFFooter } from "./AnimalsListPDFFooter";
import { AnimalsListPDFHeader } from "./AnimalsListPDFHeader";
import { useGetVetWorkData } from "features/vetWork";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";

export function AnimalsListPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const animalListClose = useAnimalListStore((state) => state.animalListClose);
  return (
    <PDFWrapper closePdf={animalListClose} filename="animalsList.pdf">
      <AnimalsListPDFHeader data={data} />
      <AnimalsListPDFBody data={data} />
      <AnimalsListPDFFooter />
    </PDFWrapper>
  );
}
