import Select, { SingleValue } from 'react-select'
import { AnimalService } from '../company.service'
import { useQuery } from "react-query";
import { useState } from 'react';
import { SpeciesSelect } from './SpeciesSelect';
import { IOption } from '../../../interfaces/FormInterface';



interface AnimalGroupsSelectProps {
    typeOfFeedingId: string;
}

export function AnimalGroupsSelect({ typeOfFeedingId }: AnimalGroupsSelectProps) {
    const [animalGroupId, setAnymalGroupId] = useState<string | undefined>()
    const { data, isLoading, error } = useQuery(['animal_groups'], () => AnimalService.getAnimalGroups(typeOfFeedingId))

    const options = data?.data?.animal_groups?.map(group => ({ value: group.id, label: group.name }))

    function handleSelect(data: SingleValue<IOption>) {
        setAnymalGroupId(data?.value?.toString());
    }

    return (
        <>
            <Select
                isSearchable
                isClearable
                options={options}
                onChange={handleSelect}
            />
            {animalGroupId ?
                <div className="form-group">
                    <label htmlFor="name" className="">
                        Выберите вид животного *
                    </label>
                    <SpeciesSelect animalGroupId={animalGroupId} />
                </div> : <p></p>
            }

        </>


    )
}