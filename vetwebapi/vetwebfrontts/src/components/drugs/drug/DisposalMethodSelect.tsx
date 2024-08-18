import { CustomSelect } from "components/CustomSelect";
import { useGetData } from "hooks/useGetData";
import { disposalMethodsUrl } from "urls/drugUrls";

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
