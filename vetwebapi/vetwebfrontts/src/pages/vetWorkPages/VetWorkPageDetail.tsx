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
import { VetWorkData } from "features/vetWork/models/interfaces";
import { AccountingActPDF } from "./vetWorkPdf/accountingActPdf/AccountingActPDF";
import useActStore from "features/vetWork/stores/useActStore";
import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";
import useReferralStore from "features/vetWork/stores/useReferralStore";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";
import useVetWorkFileStore from "features/vetWork/stores/useVetWorkFileStore";
import useVetWorkAnimalsStore from "features/vetWork/stores/useVetWorkAnimalsStore";
import useVetWorkCompanyStore from "features/vetWork/stores/useVetWorkCompanyStore";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalListStore";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import useSamplingActStore from "features/vetWork/stores/useSamplingActStore";
import { SamplingActPDF } from "./vetWorkPdf/samplingAct/SamplingActPDF";
import useBloodActStore from "features/vetWork/stores/useBloodActStore";
import { BloodActPDF } from "./vetWorkPdf/bloodActPdf/BloodActPDF";

export function VetWorkPageDetail() {
  const isAct = useActStore((state) => state.isAct);

  const isAccountingAct = useAccountingActStore(
    (state) => state.isAccountingAct
  );
  const isReferral = useReferralStore((state) => state.isReferral);
  const isAnimalList = useAnimalListStore((state) => state.isAnimalList);

  const isReferralAnimalList = useReferralAnimalListStore(
    (state) => state.isReferralAnimalList
  );

  const isSamplingAct = useSamplingActStore((state) => state.isSamplingAct);
  const isBloodAct = useBloodActStore((state) => state.isBloodAct);
  const isVetWorkFile = useVetWorkFileStore((state) => state.isFile);
  const isAnimals = useVetWorkAnimalsStore((state) => state.isAnimals);
  const companyId = useVetWorkCompanyStore((state) => state.companyId);

  const { id } = useParams();
  const vetWorkId = Number(id);
  const queryKey = VetWorkQueryKeys.vetWorkDetail;

  const { isLoading, data, isError, error }: VetWorkData = useGetDataById(
    queryKey,
    vetWorkDetailUrl(vetWorkId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;
  const disease = data.diseases[0].toLowerCase();

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
  ) : isSamplingAct ? (
    <SamplingActPDF />
  ) : isBloodAct ? (
    <BloodActPDF />
  ) : isAnimals ? (
    <AddAnimalsToVetWorkForm
      companyId={companyId}
      workType={data.work_type}
      choosenAnimals={data.animals}
      disease={disease}
    />
  ) : (
    <VetWorkDetail />
  );
}
