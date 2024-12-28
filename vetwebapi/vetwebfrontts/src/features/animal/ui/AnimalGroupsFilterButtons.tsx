import AsyncSelect from "react-select/async";
import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import {
  allFilterButton,
  animalGroupsAllUrl,
  FilterButton,
  IBase,
  useGetData,
} from "shared/index";
import { IOption } from "shared/model/FormInterface";

export function AnimalGroupsFilterButtons() {
  const { data, isLoading } = useGetData(
    "animal_groups_all",
    animalGroupsAllUrl
  );
  const animalGroupId = useCompaniesFilter((state) => state.animalGroup);
  const setAnimaGrouplId = useCompaniesFilter((state) => state.setAnimalGroup);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  if (!data.animal_groups) return;
  const options = data.animal_groups.map((animal_group: IBase) => ({
    value: animal_group.id,
    label: animal_group.name,
  }));

  const loadOptions = (searchValue: string, callback: CallableFunction) => {
    setTimeout(() => {
      const filteredOptions = options?.filter((option: IOption) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 2000);
  };

  const changeHandler = (value: IOption) => {
    setAnimaGrouplId(value.value);
  };

  return (
    <>
      <FilterButton
        item={allFilterButton}
        clickFunc={() => setAnimaGrouplId(0)}
        activeId={animalGroupId}
      />
      <AsyncSelect
        className="w-80 mr-2"
        isSearchable
        isClearable
        loadOptions={loadOptions}
        placeholder="Введите животное"
        onChange={(newValue) => changeHandler(newValue as IOption)}
      />
    </>
  );
}
