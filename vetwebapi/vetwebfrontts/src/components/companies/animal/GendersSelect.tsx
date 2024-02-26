import Select from 'react-select'
import { AnimalService } from '../company.service'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";


interface GendersSelectProps {
    speciesId: string;
}

export function GendersSelect({ speciesId }: GendersSelectProps) {

    const { data, isLoading, error } = useQuery(['genders'], () => AnimalService.getGenders(speciesId))

    const { control } = useFormContext()

    const options = data?.data?.genders?.map(gender => ({ value: gender.id, label: gender.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="gender_id"
            rules={
                { required: "Gender is required!" }
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