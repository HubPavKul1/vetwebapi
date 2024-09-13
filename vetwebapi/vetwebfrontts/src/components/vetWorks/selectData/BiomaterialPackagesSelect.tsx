import { useGetData } from "hooks/useGetData";
import { CustomSelect } from "shared/index";
import { biomaterialPackagesUrl } from "shared/urls/vetWorkUrls";

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
