import { IQueryData } from "../../../interfaces/BaseInterface";

import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function BudgetSelect() {
  const url = "/api/drugs/budgets";

  const { data, isLoading }: IQueryData = useGetData("budgets", url);
   

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="budget_id"
      placeholder="Выберите бюджет *"
    />
  );
}
