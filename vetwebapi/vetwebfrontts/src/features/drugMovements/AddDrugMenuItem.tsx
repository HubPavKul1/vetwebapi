import { GiMedicinePills } from "react-icons/gi";
import { MenuItem } from "shared/index";
import { AddDrugForm } from "./ui/AddDrugForm";

interface AddDrugMenuItemProps {
  url: string;
  queryKey: string;
}

export function AddDrugMenuItem({ ...props }: AddDrugMenuItemProps) {
  const { url, queryKey } = props;
  return (
    <MenuItem
      title="Добавить препарат"
      icon={<GiMedicinePills color="blue" fontSize={30} />}
    >
      <AddDrugForm url={url} queryKey={queryKey} />
    </MenuItem>
  );
}
