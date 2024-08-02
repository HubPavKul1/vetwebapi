import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function PositionsSelect() {
  const url = "/api/companies/positions";

  const { data, isLoading } = useGetData("positions", url);
 
  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.positions}
      fieldName="position_id"
      placeholder="Выберите должность *"
    />
  );
}
