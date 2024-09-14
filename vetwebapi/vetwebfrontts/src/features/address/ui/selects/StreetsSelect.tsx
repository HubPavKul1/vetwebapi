import AsyncSelect from "react-select/async";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";
import { useGetData } from "shared/hooks/useGetData";
import { streetsUrl } from "shared/urls/companyUrls";
import { IBase } from "shared/model/BaseInterface";

interface StreetsSelectProps {
  cityId: string;
}

export function StreetsSelect({ cityId }: StreetsSelectProps) {
  const { data, isLoading } = useGetData("cityStreets", streetsUrl(cityId));

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.streets &&
    data.streets.map((street: IBase) => ({
      value: street.id,
      label: street.name,
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
      name="street_id"
      rules={{ required: "Street is required!" }}
      render={({ field: { onChange, value } }) => (
        <AsyncSelect
          className="custom-select"
          isSearchable
          isClearable
          loadOptions={loadOptions}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
        />
      )}
    />
  );
}
