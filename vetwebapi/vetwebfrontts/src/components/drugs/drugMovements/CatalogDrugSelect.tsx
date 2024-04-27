import Select from "react-select";
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { AppService } from "../../../app.service";
import { IDrugCatalogCard } from "../../../interfaces/DrugInterfaces";


interface DrugCatalogData {
    data?: IDrugCatalogCard[];
    isLoading: boolean;
    error?: Error | null;
}

export function CatalogDrugSelect() {

    const url = "/api/drugs/catalog"

    const { data, isLoading }: DrugCatalogData = useQuery(['catalogNames'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.catalog_drugs,
    }
);

    const { control } = useFormContext()

    if (isLoading || !data) return <p>...Загрузка</p>;
    
    const options = data.map(drug=>({value: drug.id, label: `${drug.name}:${drug.batch}`}))
    
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
        name="catalog_drug_id" 
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