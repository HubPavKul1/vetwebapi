import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";
import { biomaterialPackagesUrl } from "../../urls/vetWorkUrls";

export function BiomaterialPackagesSelect() {
  const { data, isLoading } = useGetData(
    "biomaterialPackages",
    biomaterialPackagesUrl
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterial_packages}
      fieldName="biomaterial_package_id"
      placeholder="способ упаковки биоматериала"
    />
  );
}
