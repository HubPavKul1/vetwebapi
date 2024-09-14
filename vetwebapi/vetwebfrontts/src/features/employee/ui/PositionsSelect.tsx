import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { positionsUrl } from "shared/urls/companyUrls";

export function PositionsSelect() {
  const { data, isLoading } = useGetData("positions", positionsUrl);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.positions}
      fieldName="position_id"
      placeholder="Выберите должность *"
    />
  );
}
