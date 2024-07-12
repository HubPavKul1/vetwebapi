import { useQuery } from "react-query";

import { IQueryData } from "../../../interfaces/BaseInterface";
import { AppService } from "../../../app.service";
import { CustomSelect } from "../../CustomSelect";

export function DosageSelect() {
  const url = "/api/drugs/dosages";

  const { data, isLoading }: IQueryData = useQuery(
    ["dosages"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.dosages,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="dosage_id"
      placeholder="Выберите дозировку *"
    />
  );
}
