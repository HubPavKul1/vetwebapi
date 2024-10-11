import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  convertDateString,
  diseasesString,
  ErrorLoadDataMessage,
  IWrapperProps,
  Loader,
  useGetDataById,
  vetWorkDetailUrl,
} from "shared/index";
import { IVetWorkPageContext, VetWorkData } from "./models/interfaces";

export const VetWorkPageContext = createContext({});

export function VetWorkPageContextProvider({ children }: IWrapperProps) {
  const [isAct, setShowAct] = useState(false);
  const [isAnimalsList, setShowAnimalsList] = useState(false);
  const [isReferral, setShowReferral] = useState(false);
  const [isAnimals, setAnimals] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [isReferralAnimalList, setShowReferralAnimalList] = useState(false);
  const [isAccountingAct, setShowAccountingAct] = useState(false);
  const [isVetWorkFile, setShowVetWorkFile] = useState(false);

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

  const vetWorkPageValue: IVetWorkPageContext = {
    setShowAct: setShowAct,
    setShowAnimalsList: setShowAnimalsList,
    setShowReferral: setShowReferral,
    setAnimals: setAnimals,
    setCompanyId: setCompanyId,
    setShowReferralAnimalList: setShowReferralAnimalList,
    setShowAccountingAct: setShowAccountingAct,
    setShowVetWorkFile: setShowVetWorkFile,
    isAct: isAct,
    isAnimalsList: isAnimalsList,
    isReferral: isReferral,
    isAnimals: isAnimals,
    isReferralAnimalList: isReferralAnimalList,
    isAccountingAct: isAccountingAct,
    isVetWorkFile: isVetWorkFile,
    pageTitle: `${pageTitle} от ${date.shortDate} г. `,
    imgSrc: imgSrc,
    data: data,
    companyId: companyId,
    disease: disease,
  };

  return (
    <VetWorkPageContext.Provider value={vetWorkPageValue}>
      {children}
    </VetWorkPageContext.Provider>
  );
}
