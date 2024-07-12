import { useQuery } from "react-query";

import { AppService } from "../../../app.service";
import { IQueryData } from "../../../interfaces/BaseInterface";
import { CustomSelect } from "../../CustomSelect";

export function DrugManufacturerSelect() {
  const url = "/api/drugs/drug_manufacturers";

  const { data, isLoading }: IQueryData = useQuery(
    ["drugManufacturers"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.drug_manufacturers,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="drug_manufacturer_id"
      placeholder="Выберите производителя *"
    />
  );
}
