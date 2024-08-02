
import { IQueryData } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";

export function DiagnosticMethodsSelect() {
  const url = "/api/vetwork/diagnostic_methods";

  const { data, isLoading }: IQueryData = useGetData("diagnosticMethods", url);
    

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.diagnostic_methods}
      fieldName="diagnostic_method_id"
      placeholder="метод диагностики"
    />
  );
}
