import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { AnimalService } from "../company.service";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

interface CompanyAnimalProps {
    animal: IAnimal;
}




export function CompanyAnimal({animal}: CompanyAnimalProps) {
    const { id } = useParams()
    if (!id) return;

    const queryClient = useQueryClient()

    const { mutate } = useMutation(["delete animal"], {
        mutationFn: () => AnimalService.deleteAnimal(id, animal.id),
        onSuccess: () => {
            alert("Животное успешно удалено!")
            queryClient.invalidateQueries(["company", id])
        }
    },
    )

    const deleteAnimal = () => {
        mutate()
    }

 
    return(
            <tr key={animal.id}>
                <td>{animal.species}</td>
                <td>{animal.gender}</td>
                <td>{animal.date_of_birth}</td>
                <td>{animal.nickname}</td>
                <td>{animal.identification}</td>
                <td><BsPencilSquare className="edit-icon"/></td>
                <td><BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal}/></td>
            </tr>
        )                

}