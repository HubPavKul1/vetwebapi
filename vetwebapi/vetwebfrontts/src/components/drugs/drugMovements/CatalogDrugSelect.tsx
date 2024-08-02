import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { IDrugCatalogCard } from "../../../interfaces/DrugInterfaces";
import { useGetData } from "../../../hooks/useGetData";


interface DrugCatalogData {
    data?: IDrugCatalogCard[];
    isLoading: boolean;
    error?: Error | null;
}

export function CatalogDrugSelect() {

    const url = "/api/drugs/catalog"

    const { data, isLoading } = useGetData('catalogNames', url);
   

    const { control } = useFormContext()

    if (isLoading || !data) return <p>...Загрузка</p>;
    
    const options = data.catalog_drugs && data.catalog_drugs.map(drug=>({value: drug.id, label: `${drug.name}:${drug.batch}`}))
    

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
            value={getValue(value)}
            onChange={newValue => onChange((newValue as IOption).value)}
        />
        )
    
    } />
    )
}