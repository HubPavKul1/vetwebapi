import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

export default function CreateCompanyForm() {
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create company"], (data) => CompanyService.createCompany(data.full_name, data.short_name), {
        onSuccess: () => {
            queryClient.invalidateQueries(["companies"])
            reset()
        }
    })

    const createCompany = (data) => {
        
        mutate(data)
        
    }   

    
    return (

        <form action=""  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
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
                    name="short_name" 
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
