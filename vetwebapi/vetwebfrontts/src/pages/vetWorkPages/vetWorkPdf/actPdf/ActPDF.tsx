import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFFooter } from "./ActPDFFooter";
import { ActPDFHeader } from "./ActPDFHeader";
import { useContext } from "react";
import { VetWorkPageContext } from "features/vetWork/VetWorkPageContextProvider";

interface ActPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ActPDF() {
  const context = useContext(VetWorkPageContext);
  const data = context.data;
  return (
    <PDFWrapper setPdf={context.setShowAct} filename="act.pdf">
      <ActPDFHeader />
      <ActPDFBody data={data} />
      <ActPDFFooter data={data} />
    </PDFWrapper>
  );
}
