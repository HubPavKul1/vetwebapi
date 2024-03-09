import { CompanyService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { ICompanyCreate } from "../../../interfaces/CompanyInterfaces";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";



export function CreateCompanyForm() {

    const inputItems: FormInputProps<ICompanyCreate>[] = [
        {fieldName: "full_name", placeholder: "Полное наименование *"},
        {fieldName: "short_name", placeholder: "Краткое наименование *"},
    ];
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm<ICompanyCreate>({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create company"], 
        (data: ICompanyCreate) => CompanyService.createCompany(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["companies"])
            alert('Предприятие успешно добавлено!')
            reset()
        }
    })

    const createCompany: SubmitHandler<ICompanyCreate> = (data) => {
        mutate(data)
        
    }   

    
    return (

        <form onSubmit={handleSubmit(createCompany)}>
            
        {inputItems.map(item => (
            <Input key={item.fieldName} 
                className="form-control"
                style={{textAlign: "center"}}
                placeholder={item.placeholder}
                register={register}
                fieldName={item.fieldName}
                type="text"
                errors={errors}
                rules={{
                    required: fieldRequiredMessage, 
                    maxLength: {
                        value: 200,
                        message: maxLenErrorMessage+"200 символов!",
                        }, 
                    minLength: {
                        value: 3,
                        message: minLenErrorMessage+"3 символа!"
                        },
                    
                }}
            />))}
           
            <Button 
                className="btn btn-primary btn-send-message btn-md"
                disabled={false}
                name="Зарегистрировать"
            />
        </form>               
        
    )
}
