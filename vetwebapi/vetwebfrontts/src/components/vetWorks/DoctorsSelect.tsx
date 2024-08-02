import Select from 'react-select';
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../interfaces/FormInterface';
import { AppService } from '../../app.service';
import { IEmployee } from '../../interfaces/EmployeeInterfaces';
import { useGetData } from '../../hooks/useGetData';


interface IDoctorSelectProps {
    data?: IEmployee[];
    isLoading: boolean;
    error?: Error | null;

}

export function DoctorSelect() {

    const url = "/api/companies/doctors"

    const { data, isLoading }: IDoctorSelectProps = useGetData("doctors", url)
    
    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(employee => ({ value: employee.id, label: employee.fullname }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="doctors"
            rules={
                { required: "Doctor is required!" }
            }
            render={({ field: { onChange, value },
                    // fieldState: {error} 
                }) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    isMulti
                    options={options}
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption[]).map(v => v.value))}
                    placeholder="Выберите врачей *"
                    
                />
            )

            } />
    )
}

