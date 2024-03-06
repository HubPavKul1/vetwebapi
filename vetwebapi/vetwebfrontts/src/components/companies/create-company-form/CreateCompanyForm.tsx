import { CompanyService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { ICompanyCreate } from "../../../interfaces/CompanyInterfaces";
import { Input } from "../../Input";
import { Button } from "../../Button";



export function CreateCompanyForm() {
   
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
            < Input 
                className="form-control"
                style={{textAlign: "center"}}
                placeHolder="Полное наименование *"
                register={register}
                fieldName="full_name"
                type="text"
                errors={errors}
                isRequired={true}
                maximLength={255}
                minimLength={5}
            />

            < Input 
                className="form-control"
                style={{textAlign: "center"}}
                placeHolder="Краткое наименование *"
                register={register}
                fieldName="short_name"
                type="text"
                errors={errors}
                isRequired={true}
                maximLength={255}
                minimLength={5}

            />

            <Button 
                className="btn btn-primary btn-send-message btn-md"
                disabled={false}
                name="Зарегистрировать"
            />
        </form>               
        
    )
}
