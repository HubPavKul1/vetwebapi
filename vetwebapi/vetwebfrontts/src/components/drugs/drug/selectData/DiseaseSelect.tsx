import AsyncSelect from "react-select/async";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";
import { IBase } from "shared/model/BaseInterface";
import { useGetData } from "hooks/useGetData";
import { diseasesUrl } from "urls/vetWorkUrls";

interface DiseaseSelectProps {
  isMulti: boolean;
}

export function DiseaseSelect({ isMulti }: DiseaseSelectProps) {
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
