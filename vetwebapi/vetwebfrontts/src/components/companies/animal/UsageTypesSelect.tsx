import Select from 'react-select'
import { AnimalService } from '../company.service'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";



export function UsageTypesSelect() {

    const { data, isLoading, error } = useQuery(['usage_types'], () => AnimalService.getUsageTypes())

    const { control } = useFormContext()

    const options = data?.data?.usage_types?.map(item => ({ value: item.id, label: item.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="usage_type_id"
            rules={
                { required: "Usage Type is required!" }
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