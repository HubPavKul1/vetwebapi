import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function AdministrationMethodSelect() {
  const url = "/api/drugs/administration_methods";

  const { data, isLoading } = useGetData("administrationMethods", url);
  
  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.administration_methods}
      fieldName="administration_method_id"
      placeholder="Выберите способ введения *"
    />
  );
}
