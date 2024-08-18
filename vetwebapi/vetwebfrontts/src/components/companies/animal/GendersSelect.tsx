import Select from "react-select";

import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "interfaces/FormInterface";
import { useGetData } from "hooks/useGetData";
import { gendersUrl } from "urls/companyUrls";
import { IBase } from "interfaces/BaseInterface";

interface GendersSelectProps {
  speciesId: string;
}

export function GendersSelect({ speciesId }: GendersSelectProps) {
  const { data, isLoading } = useGetData("genders", gendersUrl(speciesId));

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.genders &&
    data.genders.map((gender: IBase) => ({
      value: gender.id,
      label: gender.name,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="gender_id"
      rules={{ required: "Gender is required!" }}
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
