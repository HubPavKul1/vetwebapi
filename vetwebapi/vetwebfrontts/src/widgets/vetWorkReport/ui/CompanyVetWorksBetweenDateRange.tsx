import { CreateItem } from "features/CreateItem";
import { CompanyVetWorksForm } from "features/vetWork/ui/CompanyVetworksForm";

export function CompanyVetWorksBetweenDateRange() {
  return (
    <CreateItem btnTitle="ПЭМ владельца животного за период времени">
      <CompanyVetWorksForm />
    </CreateItem>
  );
}
