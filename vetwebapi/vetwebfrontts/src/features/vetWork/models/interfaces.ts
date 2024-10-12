import { IVetWorkSchema } from "entities/vetWork";

export interface IVetWorkPageContext {
  setShowAct: CallableFunction;
  setShowAnimalsList: CallableFunction;
  setShowReferral: CallableFunction;
  setAnimals: CallableFunction;
  setCompanyId: CallableFunction;
  setShowReferralAnimalList: CallableFunction;
  setShowAccountingAct: CallableFunction;
  setShowVetWorkFile: CallableFunction;
  fullPageTitle: string;
  imgSrc: string;
  data: IVetWorkSchema;
  companyId: string;
  disease: string;
}

export interface VetWorkData {
  data?: IVetWorkSchema;
  isLoading: boolean;
  isError: boolean;
  error: Error;
}
