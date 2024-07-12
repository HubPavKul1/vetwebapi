import { useQuery } from "react-query";

import { AppService } from "../../app.service";
import { IQueryData } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";

export function DiagnosticMethodsSelect() {
  const url = "/api/vetwork/diagnostic_methods";

  const { data, isLoading }: IQueryData = useQuery(
    ["diagnosticMethods"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.diagnostic_methods,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="diagnostic_method_id"
      placeholder="метод диагностики"
    />
  );
}
