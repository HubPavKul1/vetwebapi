import { AnimalGroupsFilterItems } from "features/animal/ui/AnimalGroupsFilterItems";
import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import { CompanyQueryKeys } from "shared/constants/companyConst";
import { filteredCompaniesUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Companies() {
  const animalGroup = useCompaniesFilter((state) => state.animalGroup);

  const url = filteredCompaniesUrl(animalGroup);
  const queryKey = CompanyQueryKeys.companies + animalGroup.toString();
  return (
    <CompanyCatalog
      title="Предприятия"
      btnTitle="Добавить предприятие"
      url={url}
      queryKey={queryKey}
      imgSrc="/animalsBg.png"
      filterButtons={<AnimalGroupsFilterItems />}
    />
  );
}
