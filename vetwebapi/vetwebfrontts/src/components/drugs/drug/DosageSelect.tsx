import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";
import { dosagesUrl } from "../../../urls/drugUrls";

export function DosageSelect() {
  const { data, isLoading } = useGetData("dosages", dosagesUrl);

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.dosages}
      fieldName="dosage_id"
      placeholder="Выберите дозировку *"
    />
  );
}
