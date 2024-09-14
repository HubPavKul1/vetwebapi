import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { disposalMethodsUrl } from "shared/urls/drugUrls";

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
