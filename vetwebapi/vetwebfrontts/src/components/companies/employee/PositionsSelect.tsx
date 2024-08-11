import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";
import { positionsUrl } from "../../../Urls";

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
