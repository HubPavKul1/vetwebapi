import { IDrugReport } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";

interface ReceiptDrugProps {
  drug: IDrugReport;
  
}

export function DrugInReport({ drug }: ReceiptDrugProps) {



  return (
    <tr key={drug.id} className="border-bottom border-black">
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      {drug.expiration_date ? 
      <td>{AppService.convertDateString(drug.expiration_date).shortDate}</td>
      : <td></td>
      }
      <td>доз</td>
      {drug.packs_start ? <td>{drug.packs_start}</td> : 0}
      {drug.units_start ? <td>{drug.units_start}</td> : <td>0</td>}
      {drug.packs_received ? <td>{drug.packs_received}</td> : <td>0</td>}
      {drug.units_received ? <td>{drug.units_received}</td> : <td>0</td>}
      {drug.packs_spent ? <td>{drug.packs_spent}</td> : <td>0</td>}
      {drug.units_spent ? <td>{drug.units_spent}</td> : <td>0</td>}
      <td>{drug.disposed_units}</td>
      <td>{drug.units_spent_disposed}</td>
      {drug.packs_rest ? <td>{drug.packs_rest}</td> : <td>0</td>}
      {drug.units_rest ? <td>{drug.units_rest}</td> : <td>0</td>}
    </tr>
  );
}
