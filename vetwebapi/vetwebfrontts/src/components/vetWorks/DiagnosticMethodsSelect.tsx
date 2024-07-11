import { useQuery } from "react-query";

import { AppService } from "../../app.service";
import { IBase } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";

interface IDiagnosticMethodsSelectProps {
  data?: IBase[];
  isLoading: boolean;
  error?: Error | null;
}

export function DiagnosticMethodsSelect() {
  const url = "/api/vetwork/diagnostic_methods";

  const { data, isLoading }: IDiagnosticMethodsSelectProps = useQuery(
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
