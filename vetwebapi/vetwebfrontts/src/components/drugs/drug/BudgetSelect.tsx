import { useQuery } from "react-query";

import { IQueryData } from "../../../interfaces/BaseInterface";
import { AppService } from "../../../app.service";
import { CustomSelect } from "../../CustomSelect";

export function BudgetSelect() {
  const url = "/api/drugs/budgets";

  const { data, isLoading }: IQueryData = useQuery(
    ["budgets"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.budgets,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="budget_id"
      placeholder="Выберите бюджет *"
    />
  );
}
