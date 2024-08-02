import Select from 'react-select'
import { useState } from 'react';

import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { GendersSelect } from './GendersSelect';
import { IQueryData } from '../../../interfaces/BaseInterface';

import { useGetData } from '../../../hooks/useGetData';


interface SpeciesSelectProps {
    animalGroupId: string;
}

export function SpeciesSelect({ animalGroupId }: SpeciesSelectProps) {

    const [ speciesId , setSpeciesId ] = useState<string | undefined>()
    const { control } = useFormContext()

    const url = `/api/companies/${animalGroupId}/species`

    const { data, isLoading }: IQueryData = useGetData('species', url);

    if (isLoading || !data) return <p>Загрузка ...</p>;


    const options = data.map(spec => ({ value: spec.id, label: spec.name }))

    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value): ""
    

    return (
       <>
        <Controller
            control={control}
            name="species_id"
            rules={
                { required: "Species is required!" }
            }
            render={({ field: { onChange, value }}) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    value={getValue(value)}
                    onChange={
                        newValue => {onChange((newValue as IOption).value);
                        setSpeciesId((newValue as IOption).value.toString())}
                    }
                />
            )

            } /> 
            {speciesId ?
                <div className="form-group">
                    <label>
                        Выберите пол животного *
                    </label>
                    <GendersSelect speciesId={speciesId} />
                </div> : <p></p>
            }      
       </>
             
       
    )
}