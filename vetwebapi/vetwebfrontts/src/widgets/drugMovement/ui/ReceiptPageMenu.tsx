import {
  CustomButton,
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";

import AddDrugToReceipt from "features/drugMovements/AddDrugToReceipt";

interface ReceiptPageMenuProps {
  url: string;
  setPdf: CallableFunction;
}

export function ReceiptPageMenu({ url, setPdf }: ReceiptPageMenuProps) {
  return (
    <PageMenuWrapper>
      <PageMenuTop>
        <AddDrugToReceipt url={url} queryKey="receipt" />
      </PageMenuTop>
      <PageMenuButtonsBlock>
        <CustomButton
          className="btn-submit"
          title="Требование-заявка"
          onClick={() => setPdf(true)}
        />
      </PageMenuButtonsBlock>
    </PageMenuWrapper>
  );
}
