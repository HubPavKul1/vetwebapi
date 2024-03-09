import AsyncSelect from "react-select/async"
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";


interface StreetsSelectProps {
    cityId: string;
}

export function StreetsSelect({cityId}: StreetsSelectProps) {

    const { data } = useQuery(['cityStreets'], () => AddressService.getCityStreets(cityId))

    const { control } = useFormContext()
    
    const options = data?.data?.streets?.map(street=>({value: street.id, label: street.name}))
    
    const loadOptions = (searchValue: string, callback: CallableFunction) => {
        setTimeout(() => {
            const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
            callback(filteredOptions)
        }, 2000)
    }

    const getValue = (value: number) => 
        value ? options?.find((option) => option.value === value) : ""
    

    return (
        <Controller 
        control={control} 
        name="street_id" 
        rules={
          {required: "Street is required!"}
        }
        render={({field: {onChange, value}, fieldState: { error }}) => (
        <AsyncSelect 
            isSearchable
            isClearable
            loadOptions={loadOptions}
            value={getValue(value)}
            onChange={newValue => onChange((newValue as IOption).value)}
        />
        )
    
    } />
    )
}