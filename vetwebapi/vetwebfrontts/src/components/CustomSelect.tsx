import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "interfaces/FormInterface";
import { IBase } from "interfaces/BaseInterface";

interface ICustomSelectProps {
  data: IBase[];
  fieldName: string;
  placeholder: string;
  isValueString?: boolean;
}

export function CustomSelect({
  data,
  fieldName,
  placeholder,
  isValueString,
}: ICustomSelectProps) {
  const { control } = useFormContext();

  const options = data.map((item) => ({
    value: isValueString ? item.name : item.id,
    label: item.name,
  }));

  const getValue = (value: number | string) =>
    value ? options?.find((option) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Select
          className="custom-select"
          isSearchable
          isClearable
          options={options}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
          placeholder={placeholder}
        />
      )}
    />
  );
}
