import { Menu } from "../MenuComponent";
import { CustomButton } from "../CustomButton";
import { CreateItem } from "../CreateItem";
import { AddDrugForm } from "../drugs/drugMovements/AddDrugForm";

interface ReceiptPageMenuProps {
  url: string;
  setPdf: CallableFunction;
}

export function ReceiptPageMenu({ url, setPdf }: ReceiptPageMenuProps) {
  const menuButtons = [
    {
      id: 1,
      element: (
        <CustomButton
          className="btn-submit"
          title="Требование-заявка"
          onClick={() => setPdf(true)}
        />
      ),
    },
  ];

  return (
    <Menu buttons={menuButtons}>
      <CreateItem btnTitle="Добавить препарат">
        <AddDrugForm url={url} queryKey="receipt" />
      </CreateItem>
    </Menu>
  );
}
