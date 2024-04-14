import AsyncSelect from "react-select/async";
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { AppService } from "../../../app.service";
import { IBase } from "../../../interfaces/BaseInterface";


interface StreetsSelectProps {
    cityId: string;
}

interface StreetData {
    data?: IBase[];
    isLoading: boolean;
}

export function StreetsSelect({cityId}: StreetsSelectProps) {

    const url = `/api/companies/cities/${cityId}/streets`

    const { data, isLoading}: StreetData = useQuery(['cityStreets'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.streets
    }
)

    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;
    
    const options = data.map(street=>({value: street.id, label: street.name}))
    
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