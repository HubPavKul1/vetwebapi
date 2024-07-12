import { useQuery } from "react-query";

import { IQueryData } from "../../../interfaces/BaseInterface";
import { AppService } from "../../../app.service";
import { CustomSelect } from "../../CustomSelect";

export function AdministrationMethodSelect() {
  const url = "/api/drugs/administration_methods";

  const { data, isLoading }: IQueryData = useQuery(
    ["administrationMethods"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.administration_methods,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="administration_method_id"
      placeholder="Выберите способ введения *"
    />
  );
}
