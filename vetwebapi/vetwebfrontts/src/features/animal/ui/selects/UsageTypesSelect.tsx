import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";

import { useGetData } from "shared/hooks/useGetData";
import { usageTypesUrls } from "shared/urls/companyUrls";
import { IBase } from "shared/index";

export function UsageTypesSelect() {
  const { data, isLoading } = useGetData("usage_types", usageTypesUrls);

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.usage_types &&
    data.usage_types.map((item: IBase) => ({
      value: item.id,
      label: item.name,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="usage_type_id"
      rules={{ required: "Usage Type is required!" }}
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
