import Select from "react-select";

import { IOption } from "shared/model/FormInterface";
import { Controller, useFormContext } from "react-hook-form";
import { useGetData } from "shared/hooks/useGetData";
import { companiesAllUrl } from "shared/urls/companyUrls";
import { ICompany } from "entities/company/model/companyInterfaces";

export function CompanySelect() {
  const { data, isLoading } = useGetData("companies", companiesAllUrl);

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.companies &&
    data.companies.map((company: ICompany) => ({
      value: company.id,
      label: company.short_name,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="company_id"
      rules={{ required: "Company is required!" }}
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
