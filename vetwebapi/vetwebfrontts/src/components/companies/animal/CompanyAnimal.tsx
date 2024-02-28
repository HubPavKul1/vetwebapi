import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { AnimalService } from "../company.service";


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
                <td>
                    <div className="btn-group btn-group-sm" role="group">
                        <a
                            href="#"
                            className="btn btn-warning btn-sm"
                            
                        >
                            ред
                        </a>
                        <a
                            className="btn btn-danger btn-sm"
                            href="#"
                            onClick={deleteAnimal}
                        >
                            х
                        </a>
                    </div>
                </td>
            </tr>
        )                

}