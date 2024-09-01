import { useParams } from "react-router-dom";

import { AppService } from "services/app.service";

import { useState } from "react";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";

import { AddAnimalsToVetWorkForm } from "components/vetWorks/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { ActPDF } from "./vetWorkPdf/actPdf/ActPDF";
import { AnimalsListPDF } from "./vetWorkPdf/animalsListPdf/AnimalsListPDF";
import { VetWorkDetail } from "./VetWorkDetail";
import { ReferralPDF } from "./vetWorkPdf/referralPdf/ReferralPDF";
import { useGetDataById } from "hooks/useGetDataById";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import { vetWorkDetailUrl } from "urls/vetWorkUrls";
import { ReferralAnimalListPDF } from "./vetWorkPdf/referralAnimalListPdf/ReferralAnimalListPDF";
import AccountingActPDF from "./vetWorkPdf/accountingActPdf/AccountingActPDF";

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
  const [accountingAct, showAccountingAct] = useState(false)

  const { id } = useParams();
  const vetWorkId = Number(id);

  const { isLoading, data, isError, error }: VetWorkData = useGetDataById(
    "vetwork",
    vetWorkDetailUrl(vetWorkId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  const date = AppService.convertDateString(data.vetwork_date);
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
      {!act && !animalsList && !animals && !referral && !referralAnimalList && !accountingAct ? (
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
