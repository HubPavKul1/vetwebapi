import { AppService } from "../../../app.service";
import { IDrugReport } from "../../../interfaces/DrugInterfaces";
import { Col, Row } from "react-bootstrap";

interface ReceiptDrugProps {
  drug: IDrugReport;
}

export function DrugInReport({ drug }: ReceiptDrugProps) {

  
  return (
    <tr key={drug.id} className="border-bottom border-black text-s text-center">
      {
        drug.disease && 
        <td>{drug.disease}</td>
      }
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      {
        drug.expiration_date && 
        <td>{drug.expiration_date}</td>
      }
      <td>доз</td>
      {
        drug.packs_start && 
        <td>{drug.packs_start}</td>
      }
      
      <td>{drug.units_start}</td>
      {
        drug.packs_received && 
        <td>{drug.packs_received}</td>
      }
      <td>{drug.units_received}</td>
      {
        drug.animals_count && 
        <td>{drug.animals_count}</td>
      }
      {
        drug.packs_spent && 
        <td>{drug.packs_spent}</td>
      }
      
      <td>{drug.units_spent}</td>
      <td>{drug.disposed_units}</td>
      {
        drug.packs_rest && 
        <td>{drug.packs_rest}</td>
      }
      <td>{drug.units_rest}</td>
    </tr>
  );
}
