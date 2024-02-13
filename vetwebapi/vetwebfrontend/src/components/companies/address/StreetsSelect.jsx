import AsyncSelect from "react-select/async"
import { AddressService } from '../company.service'
import { useQueryClient, useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"


export default function StreetsSelect() {
    const {id} = useParams()
    const { data, isLoading, error } = useQuery(['streets'], () => AddressService.getStreets())

    const { register, reset, handleSubmit, formState: {errors}, control } = useForm({
        mode: "onChange",
    })
    
    // if(isLoading) return <p>Загрузка ...</p>
    
    const options = data?.map(street=>({value: street.id, label: street.name}))
    
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
            callback(filteredOptions)
        }, 2000)
    }

    const getValue = (value) => 
        value ? options.find((option) => option.value === value) : ""
    

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
            onChange={newValue => onChange((newValue).value)}
        />
        )
    
    } />
    )
}