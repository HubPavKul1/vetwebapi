import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function BudgetSelect() {
  const url = "/api/drugs/budgets";

  const { data, isLoading } = useGetData("budgets", url);
   

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.budgets}
      fieldName="budget_id"
      placeholder="Выберите бюджет *"
    />
  );
}
