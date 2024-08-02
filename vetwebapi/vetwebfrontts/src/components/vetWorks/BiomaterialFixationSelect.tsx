import { CustomSelect } from "../CustomSelect";
import { useGetData } from "../../hooks/useGetData";



export function BiomaterialFixationsSelect() {
  const url = "/api/vetwork/biomaterial_fixations";

  const { data, isLoading } = useGetData("biomaterialFixations", url);
    

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data.biomaterial_fixations}
      fieldName="biomaterial_fixation_id"
      placeholder="способ фиксации биоматериала"
    />
  );
}
