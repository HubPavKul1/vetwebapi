import { CompanyService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { ICompanyCreate } from "../../../interfaces/CompanyInterfaces";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { IInput } from "../../../interfaces/FormInterface";



export function CreateCompanyForm() {

    const inputItems: IInput[] = [
        {fieldName: "full_name", placeHolder: "Полное наименование *", maximLength: 255, minimLength: 5},
        {fieldName: "short_name", placeHolder: "Краткое наименование *", maximLength: 255, minimLength: 5},
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
                placeHolder={item.placeHolder}
                register={register}
                fieldName={item.fieldName}
                type="text"
                errors={errors}
                isRequired={true}
                maximLength={item.maximLength}
                minimLength={item.minimLength}
            />))}
           
            <Button 
                className="btn btn-primary btn-send-message btn-md"
                disabled={false}
                name="Зарегистрировать"
            />
        </form>               
        
    )
}
