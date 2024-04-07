import AsyncSelect from "react-select/async"
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { DrugService } from "../drugs.service";




export function DiseaseSelect() {

    const { data } = useQuery(['diseases'], () => DrugService.getDiseases())

    const { control } = useFormContext()
    
    const options = data?.data?.diseases?.map(disease=>({value: disease.id, label: disease.name}))
    
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
        name="disease_id" 
        rules={
          {required: "Disease is required!"}
        }
        render={({field: {onChange, value}, fieldState: { error }}) => (
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