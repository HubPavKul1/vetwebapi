import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";
import useActStore from "features/vetWork/stores/useActStore";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalListStore";
import useReferralStore from "features/vetWork/stores/useReferralStore";
import useSamplingActStore from "features/vetWork/stores/useSamplingActStore";
import useVetWorkFileStore from "features/vetWork/stores/useVetWorkFileStore";
import { PageMenuButton } from "shared/index";

export function ActBtn() {
  const actOpen = useActStore((state) => state.actOpen);
  return <PageMenuButton title="Акт на обработку" showContent={actOpen} />;
}

export function ReferralBtn() {
  const referralOpen = useReferralStore((state) => state.referralOpen);
  return <PageMenuButton title="Сопроводительная" showContent={referralOpen} />;
}

export function TubercActBtn() {
  const actOpen = useActStore((state) => state.actOpen);
  return (
    <PageMenuButton title="Акт на туберкулинизацию" showContent={actOpen} />
  );
}

export function AccountingActBtn() {
  const actOpen = useAccountingActStore((state) => state.actOpen);
  return <PageMenuButton title="Акт учета реакции" showContent={actOpen} />;
}

export function ReferralAnimalListBtn() {
  const referralAnimalListOpen = useReferralAnimalListStore(
    (state) => state.referralAnimalListOpen
  );
  return (
    <PageMenuButton
      title="Опись к сопроводительной"
      showContent={referralAnimalListOpen}
    />
  );
}

export function AnimalListBtn() {
  const animalListOpen = useAnimalListStore((state) => state.animalListOpen);

  return <PageMenuButton title="Опись животных" showContent={animalListOpen} />;
}

export function SamplingActBtn() {
  const samplingActOpen = useSamplingActStore((state) => state.samplingActOpen);
  return (
    <PageMenuButton title="Акт отбора проб" showContent={samplingActOpen} />
  );
}

export function OpenFileBtn() {
  const fileOpen = useVetWorkFileStore((state) => state.fileOpen);
  return <PageMenuButton title="Открыть документ" showContent={fileOpen} />;
}
