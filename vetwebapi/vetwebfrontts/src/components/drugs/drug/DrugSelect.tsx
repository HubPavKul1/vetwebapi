import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";

import { useGetData } from "../../../hooks/useGetData";


export function DrugSelect() {

    const url = "/api/drugs/drug_names"

    const { data, isLoading } = useGetData('drugNames', url);
    const { control } = useFormContext()

    if (isLoading || !data) return <p>...Загрузка</p>;
    
    const options = data.drugs && data.drugs.map(drug=>({value: drug.id, label: drug.name}))
    
    // const loadOptions = (searchValue: string, callback: CallableFunction) => {
    //     setTimeout(() => {
    //         const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
    //         callback(filteredOptions)
    //     }, 2000)
    // }

    const getValue = (value: number) => 
        value ? options?.find((option) => option.value === value) : ""
    

    return (
        <Controller 
        control={control} 
        name="drug_id" 
        rules={
          {required: "Drug is required!"}
        }
        render={({field: {onChange, value}}) => (
        <Select className='custom-select'
            isSearchable
            isClearable
            options={options}
            // loadOptions={loadOptions}
            value={getValue(value)}
            onChange={newValue => onChange((newValue as IOption).value)}
        />
        )
    
    } />
    )
}