import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { diagnosticMethodsUrl } from "shared/urls/vetWorkUrls";

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
