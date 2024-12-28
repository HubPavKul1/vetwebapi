import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import { allFilterButton, animalGroupsAllUrl, FilterButton, IBase, useGetData } from "shared/index";

export function AnimalGroupsFilterButtons() {
  const { data, isLoading } = useGetData(
    "animal_groups_all",
    animalGroupsAllUrl
  );
  const animalGroupId = useCompaniesFilter((state) => state.animalGroup);
  const setAnimaGrouplId = useCompaniesFilter((state) => state.setAnimalGroup);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  if (!data.animal_groups) return;

  const animalGroups: IBase[] = [allFilterButton, ...data.animal_groups];

  return (
    <>
      {animalGroups.map((animalGroup: IBase) => (
        <FilterButton
          key={animalGroup.id}
          item={animalGroup}
          clickFunc={() => setAnimaGrouplId(animalGroup.id)}
          activeId={animalGroupId}
        />
      ))}
    </>
  );
}
