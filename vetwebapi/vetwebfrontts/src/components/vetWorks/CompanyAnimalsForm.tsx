import { useQuery } from "react-query";

import { AppService } from '../../app.service';
import { IAnimal } from '../../interfaces/AnimalInterfaces';
import { AnimalCheckForm } from './AnimalCheckForm/AnimalCheckForm';


interface CompanyAnimalsProps {
    companyId: string;
}

interface IAnimalsData {
    data?: IAnimal[];
    isLoading: boolean;
}

export function CompanyAnymalsForm({ companyId }: CompanyAnimalsProps) {

    const url = `/api/companies/${companyId}/animals`

    const { data, isLoading }: IAnimalsData = useQuery(['companyAnimals'], () => AppService.getAll(url), 
    {
        select: ({data}) => data?.animals
        
    }
);

    

    if(isLoading || !data) return <p>Загрузка ...</p>;
    
    
    return (
        data.map(animal =>
            <AnimalCheckForm key={animal.id} animal={animal} />
        )
    )
}