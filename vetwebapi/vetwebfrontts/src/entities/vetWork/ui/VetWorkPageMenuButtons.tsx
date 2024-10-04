import { PageMenuButton } from "shared/index";

export const actBtn = (showAct: CallableFunction) => {
  return <PageMenuButton title="Акт на обработку" showContent={showAct} />;
};

export const referralBtn = (showReferral: CallableFunction) => {
  return <PageMenuButton title="Сопроводительная" showContent={showReferral} />;
};

export const tubercActBtn = (showAct: CallableFunction) => {
  return (
    <PageMenuButton title="Акт на туберкулинизацию" showContent={showAct} />
  );
};

export const accountingActBtn = (showAccountingAct: CallableFunction) => {
  return (
    <PageMenuButton title="Акт учета реакции" showContent={showAccountingAct} />
  );
};

export const referralAnimalListBtn = (
  showReferralAnimalList: CallableFunction
) => {
  return (
    <PageMenuButton
      title="Опись к сопроводительной"
      showContent={showReferralAnimalList}
    />
  );
};

export const animalListBtn = (showAnimalsList: CallableFunction) => {
  return (
    <PageMenuButton title="Опись животных" showContent={showAnimalsList} />
  );
};

export const openFileBtn = (showVetWorkFile: CallableFunction) => {
  return (
    <PageMenuButton title="Открыть документ" showContent={showVetWorkFile} />
  );
};
