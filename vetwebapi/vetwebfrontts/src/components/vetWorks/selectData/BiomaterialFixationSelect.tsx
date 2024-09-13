import { useGetData } from "hooks/useGetData";
import { CustomSelect } from "shared/index";
import { biomaterialFixationsUrl } from "shared/urls/vetWorkUrls";

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
