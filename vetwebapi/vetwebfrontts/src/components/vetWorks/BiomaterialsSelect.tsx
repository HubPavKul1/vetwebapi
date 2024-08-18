import { CustomSelect } from "components/CustomSelect";
import { useGetData } from "hooks/useGetData";
import { biomaterialsUrl } from "urls/vetWorkUrls";

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
