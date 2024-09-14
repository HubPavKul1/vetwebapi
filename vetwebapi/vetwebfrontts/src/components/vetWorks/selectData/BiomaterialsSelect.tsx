import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { biomaterialsUrl } from "shared/urls/vetWorkUrls";

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
