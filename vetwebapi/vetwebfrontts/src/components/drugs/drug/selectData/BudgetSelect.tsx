import { useGetData } from "hooks/useGetData";
import { CustomSelect } from "shared/index";
import { budgetsUrl } from "shared/urls/drugUrls";

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
