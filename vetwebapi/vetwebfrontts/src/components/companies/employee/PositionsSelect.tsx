import { useQuery } from "react-query";

import { AppService } from "../../../app.service";
import { IQueryData } from "../../../interfaces/BaseInterface";
import { CustomSelect } from "../../CustomSelect";

export function PositionsSelect() {
  const url = "/api/companies/positions";

  const { data, isLoading }: IQueryData = useQuery(
    ["positions"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.positions,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="position_id"
      placeholder="Выберите должность *"
    />
  );
}
