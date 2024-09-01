import { CustomSelect } from "components/CustomSelect";
import { useGetData } from "hooks/useGetData";
import { budgetsUrl } from "urls/drugUrls";

export function BudgetSelect() {
  
  const { data, isLoading } = useGetData("budgets", budgetsUrl);
   

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.budgets}
      fieldName="budget_id"
      placeholder="Выберите бюджет *"
    />
  );
}
