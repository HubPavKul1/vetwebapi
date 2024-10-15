import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFFooter } from "./ActPDFFooter";
import { ActPDFHeader } from "./ActPDFHeader";
import { useContext } from "react";
import { VetWorkPageContext } from "features/vetWork";
import { IVetWorkPageContext } from "features/vetWork/models/interfaces";
import { actClose, actOpen } from "features/vetWork/slices/actSlice";
import { useAppSelector } from "app/hooks/redux";

export function ActPDF({ ...data }: IVetWorkSchema) {
  // const context: IVetWorkPageContext = useContext(VetWorkPageContext);
  // const data = context.data;
  const act = useAppSelector((state) => state.isActOpen);

  return (
    <PDFWrapper setPdf={actOpen} filename="act.pdf">
      {/* <ActPDFHeader />
      <ActPDFBody />
      <ActPDFFooter /> */}
    </PDFWrapper>
  );
}
