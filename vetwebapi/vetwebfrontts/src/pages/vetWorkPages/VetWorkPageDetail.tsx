import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { AppService } from "../../app.service";

import { useState } from "react";
import { IVetWorkSchema } from "../../interfaces/VetWorkInterfaces";

import { AddAnimalsToVetWorkForm } from "../../components/vetWorks/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { ActPDF } from "./vaccination/vaccinationDetail/actPdf/ActPDF";
import { AnimalsListPDF } from "./vaccination/vaccinationDetail/animalsListPdf/AnimalsListPDF";
import { VetWorkDetail } from "./VetWorkDetail";
import { ReferralPDF } from "./vaccination/vaccinationDetail/referralPdf/ReferralPDF";

interface VetWorkData {
  data?: IVetWorkSchema;
  isLoading: boolean;
}

export function VetWorkPageDetail() {
  const [act, showAct] = useState(false);
  const [animalsList, showAnimalsList] = useState(false);
  const [referral, showReferral] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const { id } = useParams();
  const url = `/api/vetwork/${id}`;

  const { isLoading, data }: VetWorkData = useQuery(
    ["vetwork", id],
    () => AppService.get(url),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const date = AppService.convertDateString(data.vetwork_date);
  const diseases = data.diseases;
  const pageTitle =
    data.work_type === "вакцинация"
      ? `Вакцинация: ${diseases}`
      : `Диагностические исследования: ${diseases}`;
  const imgSrc =
    data.work_type === "вакцинация" ? "/vetworkBg.jpg" : "/diagnostic.jpg";

  return (
    <>
      {!act && !animalsList && !animals && !referral ? (
        <VetWorkDetail
          pageTitle={`${pageTitle} от ${date.shortDate} г. `}
          imgSrc={imgSrc}
          setAnimals={setAnimals}
          setCompanyId={setCompanyId}
          showAct={showAct}
          showAnimalsList={showAnimalsList}
          showReferral={showReferral}
          data={data}
        />
      ) : act ? (
        <ActPDF setPdf={showAct} data={data} />
      ) : referral ? (
        <ReferralPDF setPdf={showReferral} data={data} />
      ) : animalsList ? (
        <AnimalsListPDF setPdf={showAnimalsList} data={data} />
      ) : (
        animals && (
          <AddAnimalsToVetWorkForm
            setAnimals={setAnimals}
            companyId={companyId}
          />
        )
      )}
    </>
  );
}
