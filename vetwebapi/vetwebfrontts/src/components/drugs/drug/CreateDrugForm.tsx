import { DrugService } from "../drugs.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { CustomButton } from "../../button/CustomButton";
import { IDrugCreate } from "../../../interfaces/DrugInterfaces";
import { DiseaseSelect } from "./DiseaseSelect";


export function CreateDrugForm() {

    const inputItems: FormInputProps<IDrugCreate>[] = [
        {fieldName: "name", placeholder: "Введите наименование препарата *", type: "text"},
        {fieldName: "packing", type: "number"},
    ];
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm<IDrugCreate>({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["createReceipt"], 
        (data: IDrugCreate) => DrugService.createDrug(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(['drugReceipts'])
            alert('Поступление успешно добавлено!')
            reset()
        }
    })

    const createDrug: SubmitHandler<IDrugCreate> = (data) => {
        mutate(data)
        
    }   

    
    return (

       
        <form className="create-company-form" onSubmit={handleSubmit(createDrug)}>
            <DiseaseSelect />
            <label htmlFor="operation_date" className="form-group">
                Дата поступления *
            </label>
            
        {inputItems.map(item => (
            <Input key={item.fieldName} 
                className="form-control"
                style={{textAlign: "center"}}
                register={register}
                fieldName={item.fieldName}
                type={item.type}
                errors={errors}
                rules={{
                    required: fieldRequiredMessage      
                }}
            />))}
           
            <CustomButton
                className="btn-submit"
                disabled={false}
                title="Добавить"
            />
        </form>               
        
    )
}
