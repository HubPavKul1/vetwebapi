import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";

import { useGetData } from "shared/hooks/useGetData";
import { catalogDrugsAllUrl } from "shared/urls/drugUrls";
import { IDrugCatalogCard } from "entities/catalogDrug/model/drugCatalogInterfaces";

export function CatalogDrugSelect() {
  const { data, isLoading } = useGetData("catalogNames", catalogDrugsAllUrl);

  const { control } = useFormContext();

  if (isLoading || !data) return <p>...Загрузка</p>;

  const options =
    data.catalog_drugs &&
    data.catalog_drugs.map((drug: IDrugCatalogCard) => ({
      value: drug.id,
      label: `${drug.name}:${drug.batch}`,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="catalog_drug_id"
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
