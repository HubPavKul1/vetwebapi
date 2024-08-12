import AsyncSelect from "react-select/async";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { IBase } from "../../../interfaces/BaseInterface";
import { useGetData } from "../../../hooks/useGetData";
import { diseasesUrl } from "../../../Urls";

interface DiseaseSelectProps {
  isMulti: boolean;
  setDiseases: CallableFunction;
}

export function DiseaseSelect({ isMulti, setDiseases }: DiseaseSelectProps) {
  const { data, isLoading } = useGetData("diseases", diseasesUrl);

  const { control } = useFormContext();

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

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name={isMulti ? "diseases" : "disease_id"}
      rules={{ required: "Disease is required!" }}
      render={({ field: { onChange, value } }) => (
        <AsyncSelect
          className="custom-select"
          isSearchable
          isClearable
          isMulti={isMulti}
          loadOptions={loadOptions}
          value={getValue(value)}
          placeholder="Введите заболевание *"
          onChange={(newValue) =>
            onChange(
              // setDiseases(newValue),
              isMulti
                ? (newValue as IOption[]).map((v) => v.value)
                : (newValue as IOption).value
            )
          }
        />
      )}
    />
  );
}
