import { useParams } from "react-router-dom";

import { useState } from "react";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

import { AddAnimalsToVetWorkForm } from "features/vetWork/ui/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { ActPDF } from "./vetWorkPdf/actPdf/ActPDF";
import { AnimalsListPDF } from "./vetWorkPdf/animalsListPdf/AnimalsListPDF";
import { VetWorkDetail } from "./VetWorkDetail";
import { ReferralPDF } from "./vetWorkPdf/referralPdf/ReferralPDF";
import { useGetDataById } from "shared/hooks/useGetDataById";
import { Loader } from "shared/ui/Loader";
import { vetWorkDetailUrl } from "shared/urls/vetWorkUrls";
import { ReferralAnimalListPDF } from "./vetWorkPdf/referralAnimalListPdf/ReferralAnimalListPDF";
import AccountingActPDF from "./vetWorkPdf/accountingActPdf/AccountingActPDF";
import { VetWorkFile } from "./VetWorkFile";
import { ErrorLoadDataMessage } from "shared/index";
import { convertDateString } from "shared/helpers";

interface VetWorkData {
  data?: IVetWorkSchema;
  isLoading: boolean;
  isError: boolean;
  error: Error;
}

export function VetWorkPageDetail() {
  const [act, showAct] = useState(false);
  const [animalsList, showAnimalsList] = useState(false);
  const [referral, showReferral] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [referralAnimalList, showReferralAnimalList] = useState(false);
  const [accountingAct, showAccountingAct] = useState(false);
  const [vetWorkFile, showVetWorkFile] = useState(false);

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
  const diseases = data.diseases;
  const disease = diseases[0].toLowerCase();
  const pageTitle =
    data.work_type === "вакцинация"
      ? `Вакцинация: ${diseases}`
      : `Диагностические исследования на: ${diseases}`;
  const imgSrc =
    data.work_type === "вакцинация" ? "/vetworkBg.jpg" : "/diagnostic.jpg";

  return (
    <>
      {!act &&
      !animalsList &&
      !animals &&
      !referral &&
      !referralAnimalList &&
      !accountingAct &&
      !vetWorkFile ? (
        <VetWorkDetail
          pageTitle={`${pageTitle} от ${date.shortDate} г. `}
          imgSrc={imgSrc}
          setAnimals={setAnimals}
          setCompanyId={setCompanyId}
          showAct={showAct}
          showAnimalsList={showAnimalsList}
          showReferral={showReferral}
          showAccountingAct={showAccountingAct}
          showReferralAnimalList={showReferralAnimalList}
          showVetWorkFile={showVetWorkFile}
          data={data}
        />
      ) : act ? (
        <ActPDF setPdf={showAct} data={data} />
      ) : accountingAct ? (
        <AccountingActPDF setPdf={showAccountingAct} data={data} />
      ) : referral ? (
        <ReferralPDF setPdf={showReferral} data={data} />
      ) : referralAnimalList ? (
        <ReferralAnimalListPDF setPdf={showReferralAnimalList} data={data} />
      ) : animalsList ? (
        <AnimalsListPDF setPdf={showAnimalsList} data={data} />
      ) : vetWorkFile ? (
        <VetWorkFile setPdf={showVetWorkFile} />
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
    </>
  );
}
