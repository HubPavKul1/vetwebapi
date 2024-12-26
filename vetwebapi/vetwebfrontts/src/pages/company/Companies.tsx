import { AnimalGroupsFilterButtons } from "features/animal/ui/AnimalGroupsFilterButtons";
import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import { CompanyQueryKeys } from "shared/constants/companyConst";
import { companiesUrl, filteredCompaniesUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Companies() {
  const animalGroup = useCompaniesFilter((state) => state.animalGroup);

  // const url = filteredCompaniesUrl(animalGroup);
  const url = companiesUrl;
  const queryKey = CompanyQueryKeys.companies;
  return (
    <CompanyCatalog
      title="Предприятия"
      btnTitle="Добавить предприятие"
      url={url}
      queryKey={queryKey}
      imgSrc="/animals.jpg"
      filterButtons={<AnimalGroupsFilterButtons />}
    />
  );
}
