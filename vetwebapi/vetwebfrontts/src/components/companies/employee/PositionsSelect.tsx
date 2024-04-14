import Select from 'react-select'
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { AppService } from '../../../app.service';
import { IBase } from '../../../interfaces/BaseInterface';



interface PositionData {
    data?: IBase[];
    isLoading: boolean;
    
}

export function PositionsSelect() {

    const url = "/api/companies/positions"

    const { data, isLoading }: PositionData = useQuery(['positions'], () => AppService.getAll(url), 
    {
        select: ({data}) => data?.positions
    }
)
    
   

    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(position => ({ value: position.id, label: position.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="position_id"
            rules={
                { required: "Position is required!" }
            }
            render={({ field: { onChange, value },
                    // fieldState: { error }
                }) => (
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

