import { AnimalService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";



// доделать компонент
export function AddAnimalFileForm() {

  
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
    })

}