import { AddDrugMenuItem } from "./AddDrugMenuItem";

interface AddDrugToReceiptProps {
  url: string;
  queryKey: string;
}
export default function AddDrugToReceipt({ ...props }: AddDrugToReceiptProps) {
  const { url, queryKey } = props;

  return <AddDrugMenuItem url={url} queryKey={queryKey} />;
}
