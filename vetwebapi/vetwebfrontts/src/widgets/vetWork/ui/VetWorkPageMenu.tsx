import { PageMenuTop, PageMenuWrapper } from "shared/index";
import { AddCompanyToVetWork, AddDrugToVetWork } from "features/vetWork";

import { VetWorkMenuButtonBlock } from "features/vetWork/ui/VetWorkMenuButtonBlock";
import { IVetWorkSchema } from "entities/vetWork";

export function VetWorkPageMenu() {
  return (
    <PageMenuWrapper>
      <PageMenuTop>
        <AddCompanyToVetWork />
        <AddDrugToVetWork />
      </PageMenuTop>
      <VetWorkMenuButtonBlock />
    </PageMenuWrapper>
  );
}
