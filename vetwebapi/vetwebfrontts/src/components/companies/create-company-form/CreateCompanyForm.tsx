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
                placeholder="Полное наименование"
                register={register}
                name="full_name"
                type="text"
                errors={errors}

            />

            < Input 
                className="form-control"
                style={{textAlign: "center"}}
                placeholder="Краткое наименование"
                register={register}
                name="short_name"
                type="text"
                errors={errors}

            />

            {/* <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    style={{textAlign: "center"}}
                    type="text"    
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                    
                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div> */}
          
            {/* <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    style={{textAlign: "center"}}
                    type="text" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                    
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div> */}
            <Button 
                className="btn btn-primary btn-send-message btn-md"
                disabled={false}
                name="Зарегистрировать"
            />
        </form>               
        
    )
}
