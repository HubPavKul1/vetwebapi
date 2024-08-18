import { CustomSelect } from "components/CustomSelect";
import { useGetData } from "hooks/useGetData";
import { drugManufacturersUrl } from "urls/drugUrls";

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
