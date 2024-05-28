import { IDrugInMovement } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";
import { Col, Row } from "react-bootstrap";

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
            <Row key={drug.id}>
                <Col>{drug.name}</Col>
                <Col>{drug.batch}</Col>
                <Col>{drug.control}</Col>
                <Col>{productionDate}</Col>
                <Col>{drug.packs_amount}</Col>
                <Col>{drug.units_amount}</Col>
                {/* <td><BsPencilSquare className="edit-icon"/></td>
                <td><BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal}/></td> */}
            </Row>
        )                

}