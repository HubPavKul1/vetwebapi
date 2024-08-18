import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "interfaces/FormInterface";

import { useGetData } from "hooks/useGetData";
import { catalogDrugsUrl } from "urls/drugUrls";
import { IDrugCatalogCard } from "interfaces/DrugInterfaces";


export function CatalogDrugSelect() {
  const { data, isLoading } = useGetData("catalogNames", catalogDrugsUrl);

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
