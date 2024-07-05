import Select, { SingleValue } from 'react-select'
import { useQuery } from "react-query";
import { useState } from 'react';
import { SpeciesSelect } from './SpeciesSelect';
import { IOption } from '../../../interfaces/FormInterface';
import { AppService } from '../../../app.service';
import { IQueryData } from '../../../interfaces/BaseInterface';



interface AnimalGroupsSelectProps {
    typeOfFeedingId: string;
}


export function AnimalGroupsSelect({ typeOfFeedingId }: AnimalGroupsSelectProps) {
    const [animalGroupId, setAnymalGroupId] = useState<string | undefined>()

    const url = `/api/companies/${typeOfFeedingId}/animal_groups`

    const { data, isLoading }: IQueryData = useQuery(['animal_groups'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.animal_groups
    }
);

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(group => ({ value: group.id, label: group.name }))

    function handleSelect(data: SingleValue<IOption>) {
        setAnymalGroupId(data?.value?.toString());
    }

    return (
        <>
            <Select className='custom-select'
                id="animalGroup"
                isSearchable
                isClearable
                options={options}
                onChange={handleSelect}
            />
            {animalGroupId ?
                <div className="form-group">
                    <label>
                        Выберите вид животного *
                    </label>
                    <SpeciesSelect animalGroupId={animalGroupId} />
                </div> : <p></p>
            }

        </>


    )
}