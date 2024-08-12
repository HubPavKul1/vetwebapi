import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";
import { diagnosticMethodsUrl } from "../../Urls";

export function DiagnosticMethodsSelect() {
  const { data, isLoading } = useGetData(
    "diagnosticMethods",
    diagnosticMethodsUrl
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.diagnostic_methods}
      fieldName="diagnostic_method_id"
      placeholder="метод диагностики"
    />
  );
}
