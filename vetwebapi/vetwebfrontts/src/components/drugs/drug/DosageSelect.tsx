
import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function DosageSelect() {
  const url = "/api/drugs/dosages";

  const { data, isLoading } = useGetData("dosages", url);


  if (isLoading || !data) return <p>...Загрузка</p>;


  return (
    <CustomSelect
      data={data.dosages}
      fieldName="dosage_id"
      placeholder="Выберите дозировку *"
    />
  );
}
