import { IAnimalInVetwork } from "../../interfaces/VetWorkInterfaces";
import { useMutation, useQueryClient } from "react-query";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { AppService } from "../../app.service";

interface AnimalInVetworkProps {
    animal: IAnimalInVetwork;
}


export function AnimalInVetwork({animal}: AnimalInVetworkProps) {

    

    // const url = `/api/vetwork/${id}/animals/${animal.id}`

    // const queryClient = useQueryClient()

    // const { mutate } = useMutation(["delete animal"], {
    //     mutationFn: () => AppService.deleteItem(url),
    //     onSuccess: () => {
    //         alert("Животное успешно удалено!")
    //         queryClient.invalidateQueries(["company", id])
    //     }
    // },
    // )

    // const deleteAnimal = () => {
    //     mutate()
    // }
    const date_of_birth = AppService.convertDateString(animal.date_of_birth).shortDate
 
    return(
            <tr key={animal.id}>
                <td>{animal.species}</td>
                <td>{animal.gender}</td>
                <td>{date_of_birth}</td>
                <td>{animal.nickname}</td>
                <td>{animal.identification}</td>
                <td><BsPencilSquare className="edit-icon"/></td>
                <td><BsFillTrash3Fill className="delete-icon"/></td>
            </tr>
        )                

}