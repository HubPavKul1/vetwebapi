import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function DrugManufacturerSelect() {
  const url = "/api/drugs/drug_manufacturers";

  const { data, isLoading } = useGetData("drugManufacturers", url);
    

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.drug_manufacturers}
      fieldName="drug_manufacturer_id"
      placeholder="Выберите производителя *"
    />
  );
}
