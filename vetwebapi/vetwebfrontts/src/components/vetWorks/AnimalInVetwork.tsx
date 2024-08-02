import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { AppService } from "../../app.service";
import { Col, Row } from "react-bootstrap";
import { IAnimal } from "../../interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useDeleteItem } from "../../hooks/useDeleteItem";

interface AnimalInVetworkProps {
    animal: IAnimal;
}


export function AnimalInVetwork({animal}: AnimalInVetworkProps) {
    const { id }= useParams()

    const url = `/api/vetwork/${id}/animals/${animal.animal_id}`


    const { mutate } = useDeleteItem("delete animal", url, "vetwork", "Животное успешно удалено!", id);

    const deleteAnimal = () => {
        mutate()
    }
    const date_of_birth = AppService.convertDateString(animal.date_of_birth).shortDate
 
    return(
            <Row key={animal.animal_id}>
                <Col>{animal.species}</Col>
                <Col>{animal.gender}</Col>
                <Col>{date_of_birth}</Col>
                <Col>{animal.nickname}</Col>
                <Col>{animal.identification}</Col>
                <Col>{animal.dosage}</Col>
                {animal.is_positive ? <Col className="text-red-600 font-bold">Положительный!</Col> : <Col>Отрицательный</Col>}
                <Col><BsPencilSquare className="edit-icon"/></Col>
                <Col><BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal}/></Col>
             </Row>
        )                

}