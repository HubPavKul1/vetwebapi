import { IDrugInMovement } from "../model/drugMovementInterfaces";

interface ReceiptDrugCardBodyProps {
  drug: IDrugInMovement;
}

export function ReceiptDrugCardBody({ ...props }: ReceiptDrugCardBodyProps) {
  const { drug } = props;
  return (
    <div className="m-0 mb-1 text-left text-xs text-indigo-900">
      {drug.name} (серия: {drug.batch})
    </div>
  );
}
