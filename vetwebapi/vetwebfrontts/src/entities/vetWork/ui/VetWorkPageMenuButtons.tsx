import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";
import useActStore from "features/vetWork/stores/useActStore";
import useAnimalListStore from "features/vetWork/stores/useAnimalListStore";
import useReferralAnimalListStore from "features/vetWork/stores/useReferralAnimalList";
import useReferralStore from "features/vetWork/stores/useReferralStore";
import useVetWorkFileStore from "features/vetWork/stores/useVetWorkFileStore";
import { PageMenuButton } from "shared/index";

export const actBtn = () => {
  const actOpen = useActStore((state) => state.actOpen);
  return <PageMenuButton title="Акт на обработку" showContent={actOpen} />;
};

export const referralBtn = () => {
  const referralOpen = useReferralStore((state) => state.referralOpen);
  return <PageMenuButton title="Сопроводительная" showContent={referralOpen} />;
};

export const tubercActBtn = () => {
  const actOpen = useActStore((state) => state.actOpen);
  return (
    <PageMenuButton title="Акт на туберкулинизацию" showContent={actOpen} />
  );
};

export const accountingActBtn = () => {
  const actOpen = useAccountingActStore((state) => state.actOpen);
  return <PageMenuButton title="Акт учета реакции" showContent={actOpen} />;
};

export const referralAnimalListBtn = () => {
  const referralAnimalListOpen = useReferralAnimalListStore(
    (state) => state.referralAnimalListOpen
  );
  return (
    <PageMenuButton
      title="Опись к сопроводительной"
      showContent={referralAnimalListOpen}
    />
  );
};

export const animalListBtn = () => {
  const animalListOpen = useAnimalListStore((state) => state.animalListOpen);
  return <PageMenuButton title="Опись животных" showContent={animalListOpen} />;
};

export const openFileBtn = () => {
  const fileOpen = useVetWorkFileStore((state) => state.fileOpen);
  return <PageMenuButton title="Открыть документ" showContent={fileOpen} />;
};
