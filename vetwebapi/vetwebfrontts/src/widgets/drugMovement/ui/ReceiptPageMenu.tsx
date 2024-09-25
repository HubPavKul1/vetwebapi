import {
  CustomButton,
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";

import { AddDrugForm } from "features/drugMovements/ui/AddDrugForm";
import { CreateItem } from "features/CreateItem";

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
    <PageMenuWrapper>
      <PageMenuTop></PageMenuTop>
      <PageMenuButtonsBlock>
        <CreateItem btnTitle="Добавить препарат">
          <AddDrugForm url={url} queryKey="receipt" />
        </CreateItem>
        {menuButtons.map((item) => (
          <div key={item.id}>{item.element}</div>
        ))}
      </PageMenuButtonsBlock>
    </PageMenuWrapper>
  );
}
