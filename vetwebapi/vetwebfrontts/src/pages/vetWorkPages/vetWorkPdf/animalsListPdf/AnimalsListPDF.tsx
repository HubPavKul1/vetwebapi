import { PDFWrapper } from "shared/ui/PDFWrapper";
import { AnimalsListPDFBody } from "./AnimalsListPDFBody";
import { AnimalsListPDFFooter } from "./AnimalsListPDFFooter";
import { AnimalsListPDFHeader } from "./AnimalsListPDFHeader";
import { useGetVetWorkData } from "features/vetWork";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";
import { Container } from "react-bootstrap";

export function AnimalsListPDF() {
  const data = useGetVetWorkData();
  if (!data) return;
  const animalListClose = useAnimalListStore((state) => state.animalListClose);

  return (
    <PDFWrapper closePdf={animalListClose} filename="animalsList.pdf">
      <Container className="pl-20 pr-5 py-5 font-serif text-lg">
        <AnimalsListPDFHeader data={data} />
        <AnimalsListPDFBody data={data} />
        <AnimalsListPDFFooter />
      </Container>
    </PDFWrapper>
  );
}
