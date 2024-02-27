import { ChangeEvent } from "react";
import { AnimalService } from "../company.service";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";



export function UploadAnimalForm() {

    const {id} = useParams()
    if (!id) return;
    
  
    const { register, handleSubmit, reset } = useForm<FileList>();
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload animals"], {
        mutationFn: (data: File | null) => AnimalService.uploadAnimals(id, data),
        onSuccess: () => {
            alert("Животные успешно добавлены!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
    )

    const onSubmit: SubmitHandler<FileList> = data => {
       console.log("DATA:::", data.item)
       const fileData: File | null = data[0]
       mutate(fileData)
        
    }

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("item")} />

                <input type="submit" className="btn btn-primary btn-send-message btn-md"/>
            </form>
        </div>
            
  
    );

}