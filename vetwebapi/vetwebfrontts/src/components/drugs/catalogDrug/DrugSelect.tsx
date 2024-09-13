import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";

import { useGetData } from "hooks/useGetData";
import { IBase } from "shared/model/BaseInterface";
import { drugNamesUrl } from "shared/urls/drugUrls";

export function DrugSelect() {
  const { data, isLoading } = useGetData("drugNames", drugNamesUrl);
  const { control } = useFormContext();

  if (isLoading || !data) return <p>...Загрузка</p>;

  const options =
    data.drugs &&
    data.drugs.map((drug: IBase) => ({ value: drug.id, label: drug.name }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="drug_id"
      rules={{ required: "Drug is required!" }}
      render={({ field: { onChange, value } }) => (
        <Select
          className="custom-select"
          isSearchable
          isClearable
          options={options}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
        />
      )}
    />
  );
}
