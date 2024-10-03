import { IDrugInMovement } from "../model/drugMovementInterfaces";

interface ReceiptDrugCardBodyProps {
  drug: IDrugInMovement;
}

export function ReceiptDrugCardBody({ ...props }: ReceiptDrugCardBodyProps) {
  const { drug } = props;
  return (
    <div className="text-base">
      {drug.name} (серия: {drug.batch})
    </div>
  );
}
