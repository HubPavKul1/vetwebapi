import Select from 'react-select'
import { AnimalService } from '../company.service'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";


interface SpeciesSelectProps {
    animalGroupId: string;
}

export function SpeciesSelect({ animalGroupId }: SpeciesSelectProps) {

    const { data, isLoading, error } = useQuery(['species'], () => AnimalService.getSpecies(animalGroupId))

    const { control } = useFormContext()

    const options = data?.data?.species?.map(spec => ({ value: spec.id, label: spec.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="species_id"
            rules={
                { required: "Species is required!" }
            }
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                    isSearchable
                    isClearable
                    options={options}
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                />
            )

            } />
    )
}