import Select, { SingleValue } from 'react-select'
import { useState } from 'react';
import { SpeciesSelect } from './SpeciesSelect';
import { IOption } from '../../../interfaces/FormInterface';
import { AppService } from '../../../app.service';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { useGetData } from '../../../hooks/useGetData';



interface AnimalGroupsSelectProps {
    typeOfFeedingId: string;
}


export function AnimalGroupsSelect({ typeOfFeedingId }: AnimalGroupsSelectProps) {
    const [animalGroupId, setAnimalGroupId] = useState<string | undefined>()

    const url = `/api/companies/${typeOfFeedingId}/animal_groups`

    const { data, isLoading }: IQueryData = useGetData('animal_groups', url);

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(group => ({ value: group.id, label: group.name }))

    function handleSelect(data: SingleValue<IOption>) {
        setAnimalGroupId(data?.value?.toString());
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