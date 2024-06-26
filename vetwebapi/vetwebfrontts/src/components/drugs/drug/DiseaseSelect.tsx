import AsyncSelect from "react-select/async"
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { AppService } from "../../../app.service";
import { IQueryData } from "../../../interfaces/BaseInterface";
import { OnChangeValue } from "react-select";


interface DiseaseSelectProps {
    isMulti: boolean;
}

export function DiseaseSelect({isMulti}: DiseaseSelectProps) {

    const url = "/api/vetwork/diseases"

    const { data, isLoading }: IQueryData = useQuery(['diseases'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.diseases,
    }
);

    const { control } = useFormContext()

    if (isLoading || !data) return <p>...Загрузка</p>;
    
    const options = data.map(disease=>({value: disease.id, label: disease.name}))
    
    const loadOptions = (searchValue: string, callback: CallableFunction) => {
        setTimeout(() => {
            const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
            callback(filteredOptions)
        }, 2000)
    }

    const getValue = (value: number) => 
        value ? options?.find((option) => option.value === value) : ""

    const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
        (newValue as IOption[]).map(v => v.value)
    }
    

    return (
        <Controller 
        control={control} 
        name={isMulti ? "diseases": "disease_id"}
        rules={
          {required: "Disease is required!"}
        }
        render={({field: {onChange, value}}) => (
        <AsyncSelect className='custom-select'
            isSearchable
            isClearable
            isMulti={isMulti}
            loadOptions={loadOptions}
            value={getValue(value)}
            placeholder="Введите заболевание *"
            onChange={newValue => onChange(isMulti ? (newValue as IOption[]).map(v => v.value): 
                (newValue as IOption).value
            )}
        />
        )
    
    } />
    )
}