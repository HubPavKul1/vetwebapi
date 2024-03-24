import Select from 'react-select'
import { EmployeeService } from '../company.service'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';



export function PositionsSelect() {
 
    const { data, isLoading, error } = useQuery(['positions'], () => EmployeeService.getPositions())

    const { control } = useFormContext()

    const options = data?.data?.positions?.map(position => ({ value: position.id, label: position.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="position_id"
            rules={
                { required: "Position is required!" }
            }
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select className='custom-select'
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

