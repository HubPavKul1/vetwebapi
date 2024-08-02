
import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";

export function BiomaterialsSelect() {
  const url = "/api/vetwork/biomaterials";

  const { data, isLoading } = useGetData("biomaterials", url);
   
  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterials}
      fieldName="biomaterial_id"
      placeholder="Выберите биоматериал"
    />
  );
}
