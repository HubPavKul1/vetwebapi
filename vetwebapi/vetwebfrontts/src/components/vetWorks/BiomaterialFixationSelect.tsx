import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";
import { biomaterialFixationsUrl } from "../../urls/vetWorkUrls";

export function BiomaterialFixationsSelect() {
  const { data, isLoading } = useGetData(
    "biomaterialFixations",
    biomaterialFixationsUrl
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterial_fixations}
      fieldName="biomaterial_fixation_id"
      placeholder="способ фиксации биоматериала"
    />
  );
}
