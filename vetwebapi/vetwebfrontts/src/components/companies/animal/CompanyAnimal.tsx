import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimalService } from "../company.service";


interface CompanyAnimalProps {
    animal: IAnimal;
}


export function CompanyAnimal({animal}: CompanyAnimalProps) {
    const { id } = useParams()
    if (!id) return;

    
    
    
    const { error } = useQuery(['animal_delete'], () => AnimalService.deleteAnimal(id, animal.id), {
        enabled: !!id
      }
      );

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
                        >
                            х
                        </a>
                    </div>
                </td>
            </tr>
        )                

}