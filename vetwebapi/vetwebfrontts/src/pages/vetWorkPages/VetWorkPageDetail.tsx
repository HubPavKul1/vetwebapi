import { useParams } from "react-router-dom";

import { AddAnimalsToVetWorkForm } from "features/vetWork/ui/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { ActPDF } from "./vetWorkPdf/actPdf/ActPDF";
import { AnimalsListPDF } from "./vetWorkPdf/animalsListPdf/AnimalsListPDF";
import { VetWorkDetail } from "./VetWorkDetail";
import { ReferralPDF } from "./vetWorkPdf/referralPdf/ReferralPDF";
import { useGetDataById } from "shared/hooks/useGetDataById";
import { Loader } from "shared/ui/Loader";
import { vetWorkDetailUrl } from "shared/urls/vetWorkUrls";
import { ReferralAnimalListPDF } from "./vetWorkPdf/referralAnimalListPdf/ReferralAnimalListPDF";
import { VetWorkFile } from "./VetWorkFile";
import { ErrorLoadDataMessage } from "shared/index";
import { convertDateString, diseasesString } from "shared/helpers";
import { VetWorkData } from "features/vetWork/models/interfaces";
import { VetWorkPageContext } from "features/vetWork";
import { useEffect, useState } from "react";
import { AccountingActPDF } from "./vetWorkPdf/accountingActPdf/AccountingActPDF";
import { RootState } from "app/store";
import { IVetWorkSchema } from "entities/vetWork";
import { useAppDispatch, useAppSelector } from "app/hooks/redux";
import useActStore from "features/vetWork/stores/useActStore";
import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";
import useReferralStore from "features/vetWork/stores/useReferralStore";
import useTubercActStore from "features/vetWork/stores/useTubercActStore";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalList";
import useVetWorkFileStore from "features/vetWork/stores/useVetWorkFileStore";

export function VetWorkPageDetail() {
  // const [isAct, setShowAct] = useState(false);
  // const [isAnimalsList, setShowAnimalsList] = useState(false);
  // const [isReferral, setShowReferral] = useState(false);
  // const [isAnimals, setAnimals] = useState(false);
  // const [companyId, setCompanyId] = useState("");
  // const [isReferralAnimalList, setShowReferralAnimalList] = useState(false);
  // const [isAccountingAct, setShowAccountingAct] = useState(false);
  // const [isVetWorkFile, setShowVetWorkFile] = useState(false);

  const isAct = useActStore((state) => state.isAct);
  const isAccountingAct = useAccountingActStore(
    (state) => state.isAccountingAct
  );
  const isReferral = useReferralStore((state) => state.isReferral);
  const isAnimalList = useAnimalListStore((state) => state.isAnimalList);
  const isReferralAnimalList = useReferralAnimalListStore(
    (state) => state.isReferralAnimalList
  );
  const isVetWorkFile = useVetWorkFileStore((state) => state.isFile);

  const { id } = useParams();
  const vetWorkId = Number(id);

  const { isLoading, data, isError, error }: VetWorkData = useGetDataById(
    "vetwork",
    vetWorkDetailUrl(vetWorkId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  // const vetWorkPageValues: IVetWorkPageContext = {
  //   setShowAct,
  //   setShowAnimalsList,
  //   setShowReferral,
  //   setAnimals,
  //   setCompanyId,
  //   setShowReferralAnimalList,
  //   setShowAccountingAct,
  //   setShowVetWorkFile,
  //   fullPageTitle,
  //   imgSrc,
  //   data,
  //   companyId,
  //   disease,
  // };

  return isAct ? (
    <ActPDF />
  ) : isAccountingAct ? (
    <AccountingActPDF />
  ) : isReferral ? (
    <ReferralPDF />
  ) : isReferralAnimalList ? (
    <ReferralAnimalListPDF />
  ) : isAnimalList ? (
    <AnimalsListPDF />
  ) : isVetWorkFile ? (
    <VetWorkFile />
  ) : (
    <VetWorkDetail />
  );
  // <VetWorkPageContext.Provider value={vetWorkPageValues}>
  //   {!isAct &&
  //   !isAnimalsList &&
  //   !isAnimals &&
  //   !isReferral &&
  //   !isReferralAnimalList &&
  //   !isAccountingAct &&
  //   !isVetWorkFile ? (
  //     <VetWorkDetail />
  //   ) : isAct ? (
  //     <ActPDF />
  //   ) : isAccountingAct ? (
  //     <AccountingActPDF />
  //   ) : isReferral ? (
  //     <ReferralPDF setPdf={setShowReferral} data={data} />
  //   ) : isReferralAnimalList ? (
  //     <ReferralAnimalListPDF setPdf={setShowReferralAnimalList} data={data} />
  //   ) : isAnimalsList ? (
  //     <AnimalsListPDF setPdf={setShowAnimalsList} data={data} />
  //   ) : isVetWorkFile ? (
  //     <VetWorkFile setPdf={setShowVetWorkFile} />
  //   ) : (
  //     isAnimals && (
  //       <AddAnimalsToVetWorkForm
  //         setAnimals={setAnimals}
  //         companyId={companyId}
  //         workType={data.work_type}
  //         choosenAnimals={data.animals}
  //         disease={disease}
  //       />
  //     )
  //   )}
  // </VetWorkPageContext.Provider>
}
