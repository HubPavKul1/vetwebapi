import { useGetData } from "hooks/useGetData";
import { CustomSelect } from "shared/index";
import { drugManufacturersUrl } from "shared/urls/drugUrls";

export function DrugManufacturerSelect() {
  const { data, isLoading } = useGetData(
    "drugManufacturers",
    drugManufacturersUrl
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.drug_manufacturers}
      fieldName="drug_manufacturer_id"
      placeholder="Выберите производителя *"
    />
  );
}
