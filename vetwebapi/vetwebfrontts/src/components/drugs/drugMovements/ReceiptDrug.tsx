
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { IDrugInMovement } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";

interface ReceiptDrugProps {
    drug: IDrugInMovement;
}


export function ReceiptDrug({drug}: ReceiptDrugProps) {

    const productionDate = AppService.convertDateString(drug.production_date).shortDate
     

    // const queryClient = useQueryClient()
    // if (!id) return;

    // const { mutate } = useMutation(["delete animal"], {
    //     mutationFn: () => AnimalService.deleteAnimal(id, animal.id),
    //     onSuccess: () => {
    //         alert("Животное успешно удалено!")
    //         queryClient.invalidateQueries(["company", id])
    //     }
    // },
    // )

    // const deleteAnimal = () => {
    //     mutate()
    // }

 
    return(
            <tr key={drug.id}>
                <td>{drug.name}</td>
                <td>{drug.batch}</td>
                <td>{drug.control}</td>
                <td>{productionDate}</td>
                <td>{drug.packs_amount}</td>
                <td>{drug.units_amount}</td>
                {/* <td><BsPencilSquare className="edit-icon"/></td>
                <td><BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal}/></td> */}
            </tr>
        )                

}