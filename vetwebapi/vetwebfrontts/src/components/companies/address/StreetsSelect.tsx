import AsyncSelect from "react-select/async";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { useGetData } from "../../../hooks/useGetData";


interface StreetsSelectProps {
    cityId: string;
}



export function StreetsSelect({cityId}: StreetsSelectProps) {

    const url = `/api/companies/cities/${cityId}/streets`

    const { data, isLoading} = useGetData('cityStreets', url);
  
    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;
    
    const options = data.streets && data.streets.map(street=>({value: street.id, label: street.name}))
    
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
        render={({field: {onChange, value}}) => (
        <AsyncSelect className='custom-select'
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