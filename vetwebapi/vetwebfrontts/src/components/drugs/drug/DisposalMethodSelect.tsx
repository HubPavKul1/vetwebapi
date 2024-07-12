import { useQuery } from "react-query";

import { IQueryData } from "../../../interfaces/BaseInterface";
import { AppService } from "../../../app.service";
import { CustomSelect } from "../../CustomSelect";

export function DisposalMethodSelect() {
  const url = "/api/drugs/disposal_methods";

  const { data, isLoading }: IQueryData = useQuery(
    ["disposalMethods"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.disposal_methods,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="disposal_method_id"
      placeholder="Выберите способ утилизации *"
    />
  );
}
