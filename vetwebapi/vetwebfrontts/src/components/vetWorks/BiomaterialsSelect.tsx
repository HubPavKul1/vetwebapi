import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";
import { biomaterialsUrl } from "../../Urls";

export function BiomaterialsSelect() {
  const { data, isLoading } = useGetData("biomaterials", biomaterialsUrl);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterials}
      fieldName="biomaterial_id"
      placeholder="Выберите биоматериал"
    />
  );
}
