import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { dosagesUrl } from "shared/urls/drugUrls";

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
