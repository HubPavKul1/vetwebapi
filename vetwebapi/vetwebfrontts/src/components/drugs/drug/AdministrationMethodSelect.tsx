import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";
import { administrationMethodsUrl } from "../../../urls/drugUrls";

export function AdministrationMethodSelect() {
  const { data, isLoading } = useGetData(
    "administrationMethods",
    administrationMethodsUrl
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.administration_methods}
      fieldName="administration_method_id"
      placeholder="Выберите способ введения *"
    />
  );
}
