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
import {
  IVetWorkPageContext,
  VetWorkData,
} from "features/vetWork/models/interfaces";
import { VetWorkPageContext } from "features/vetWork";
import { useState } from "react";
import { AccountingActPDF } from "./vetWorkPdf/accountingActPdf/AccountingActPDF";

export function VetWorkPageDetail() {
  const [act, setShowAct] = useState(false);
  const [animalsList, setShowAnimalsList] = useState(false);
  const [referral, setShowReferral] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [referralAnimalList, setShowReferralAnimalList] = useState(false);
  const [accountingAct, setShowAccountingAct] = useState(false);
  const [vetWorkFile, setShowVetWorkFile] = useState(false);

  const { id } = useParams();
  const vetWorkId = Number(id);

  const { isLoading, data, isError, error }: VetWorkData = useGetDataById(
    "vetwork",
    vetWorkDetailUrl(vetWorkId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  const date = convertDateString(data.vetwork_date);
  const diseases = [...diseasesString(data.diseases)];
  const disease = data.diseases[0].toLowerCase();
  const pageTitle =
    data.work_type === "вакцинация"
      ? `Вакцинация: ${diseases}`
      : `Диагностические исследования на: ${diseases}`;
  const imgSrc =
    data.work_type === "вакцинация" ? "/vetworkBg.jpg" : "/diagnostic.jpg";

  const vetWorkPageValues: IVetWorkPageContext = {
    setShowAct: setShowAct,
    setShowAnimalsList: setShowAnimalsList,
    setShowReferral: setShowReferral,
    setAnimals: setAnimals,
    setCompanyId: setCompanyId,
    setShowReferralAnimalList: setShowReferralAnimalList,
    setShowAccountingAct: setShowAccountingAct,
    setShowVetWorkFile: setShowVetWorkFile,
    pageTitle: `${pageTitle} от ${date.shortDate} г. `,
    imgSrc: imgSrc,
    data: data,
    companyId: companyId,
    disease: disease,
  };

  return (
    <VetWorkPageContext.Provider value={vetWorkPageValues}>
      {!act &&
      !animalsList &&
      !animals &&
      !referral &&
      !referralAnimalList &&
      !accountingAct &&
      !vetWorkFile ? (
        <VetWorkDetail/>
      ) : act ? (
        <ActPDF />
      ) : accountingAct ? (
        <AccountingActPDF />
      ) : referral ? (
        <ReferralPDF setPdf={setShowReferral} data={data} />
      ) : referralAnimalList ? (
        <ReferralAnimalListPDF setPdf={setShowReferralAnimalList} data={data} />
      ) : animalsList ? (
        <AnimalsListPDF setPdf={setShowAnimalsList} data={data} />
      ) : vetWorkFile ? (
        <VetWorkFile setPdf={setShowVetWorkFile} />
      ) : (
        animals && (
          <AddAnimalsToVetWorkForm
            setAnimals={setAnimals}
            companyId={companyId}
            workType={data.work_type}
            choosenAnimals={data.animals}
            disease={disease}
          />
        )
      )}
    </VetWorkPageContext.Provider>
  );
}
