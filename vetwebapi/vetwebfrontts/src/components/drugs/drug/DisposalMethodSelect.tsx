import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function DisposalMethodSelect() {
  const url = "/api/drugs/disposal_methods";

  const { data, isLoading } = useGetData("disposalMethods", url);


  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.disposal_methods}
      fieldName="disposal_method_id"
      placeholder="Выберите способ утилизации *"
    />
  );
}
