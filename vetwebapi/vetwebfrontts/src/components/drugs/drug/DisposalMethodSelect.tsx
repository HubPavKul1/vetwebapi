import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";
import { disposalMethodsUrl } from "../../../Urls";

export function DisposalMethodSelect() {
  
  const { data, isLoading } = useGetData("disposalMethods", disposalMethodsUrl);


  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.disposal_methods}
      fieldName="disposal_method_id"
      placeholder="Выберите способ утилизации *"
    />
  );
}
