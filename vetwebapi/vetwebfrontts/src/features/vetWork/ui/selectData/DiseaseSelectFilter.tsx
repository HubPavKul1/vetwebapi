import useVetWorkFilterStore from "features/vetWork/stores/useVetWorkFilterStore";
import AsyncSelect from "react-select/async";
import { diseasesUrl, IBase, useGetData } from "shared/index";
import { IOption } from "shared/model/FormInterface";

export function DiseaseSelectFilter() {
  const { data, isLoading } = useGetData("diseases", diseasesUrl);
  const setDiseaseId = useVetWorkFilterStore((state) => state.setDiseaseId)

  if (isLoading || !data) return <p>...Загрузка</p>;

  const options =
    data.diseases &&
    data.diseases.map((disease: IBase) => ({
      value: disease.id,
      label: disease.name,
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
    setDiseaseId(value.value)
  };

  return (
    <>
      <AsyncSelect
        className="w-80 mr-2"
        isSearchable
        isClearable
        loadOptions={loadOptions}
        placeholder="Введите заболевание"
        onChange={(newValue) => changeHandler(newValue as IOption)}
      />
    </>
  );
}
