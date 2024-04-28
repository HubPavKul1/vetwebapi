import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { useMutation, useQueryClient } from "react-query";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { AppService } from "../../../app.service";

interface CompanyAnimalProps {
    animal: IAnimal;
    company_id: number;
}


export function CompanyAnimal({animal, company_id}: CompanyAnimalProps) {

    const id = company_id.toString()

    const url = `/api/companies/${id}/animals/${animal.id}`

    const queryClient = useQueryClient()

    const { mutate } = useMutation(["delete animal"], {
        mutationFn: () => AppService.deleteItem(url),
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