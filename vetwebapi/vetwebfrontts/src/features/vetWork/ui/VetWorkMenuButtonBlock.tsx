interface VetWorkMenuButtonBlockProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
  showReferral: CallableFunction;
  showReferralAnimalList: CallableFunction;
  showAccountingAct: CallableFunction;
  workType: string;
  disease: string;
  showVetWorkFile: CallableFunction;
  fileId?: number;
}

// export function VetWorkMenuButtonBlock({
//   ...props
// }: VetWorkMenuButtonBlockProps) {
//   const {
//     showAct,
//     showAnimalsList,
//     showReferral,
//     showReferralAnimalList,
//     showAccountingAct,
//     showVetWorkFile,
//     workType,
//     disease,
//     fileId,
//   } = props;
// }
