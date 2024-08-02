import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";



export function BiomaterialPackagesSelect() {
  const url = "/api/vetwork/biomaterial_packages";

  const { data, isLoading } = useGetData("biomaterialPackages", url);


  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterial_packages}
      fieldName="biomaterial_package_id"
      placeholder="способ упаковки биоматериала"
    />
  );
}
