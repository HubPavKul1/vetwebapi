import {
  PageMenuButton,
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";

import AddDrugToReceipt from "features/drugMovements/AddDrugToReceipt";
import useReceiptPDFStore from "features/drugMovements/stores/useReceiptPDFStore";

interface ReceiptPageMenuProps {
  url: string;
}

export function ReceiptPageMenu({ url }: ReceiptPageMenuProps) {
  const receiptPDFOpen = useReceiptPDFStore((state) => state.receiptPdfOpen);
  return (
    <PageMenuWrapper>
      <PageMenuTop>
        <AddDrugToReceipt url={url} queryKey="receipt" />
      </PageMenuTop>
      <PageMenuButtonsBlock>
        <PageMenuButton
          title="Требование-заявка"
          showContent={receiptPDFOpen}
        />
      </PageMenuButtonsBlock>
    </PageMenuWrapper>
  );
}
