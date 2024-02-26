import { CompanyService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { ICompanyCreate } from "../../../interfaces/CompanyInterfaces";



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
        console.log(data)
        mutate(data)
        
    }   

    
    return (

        <form action=""  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"    
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                    
                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
          
            <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                    
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                   
                />
            </div>
        </form>               
        
    )
}
