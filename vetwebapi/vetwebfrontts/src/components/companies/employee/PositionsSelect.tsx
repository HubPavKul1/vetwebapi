import { CustomSelect } from "components/CustomSelect";
import { useGetData } from "hooks/useGetData";
import { positionsUrl } from "urls/companyUrls";

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
