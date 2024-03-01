import { AnimalService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";



export function UploadAnimalForm() {

    const {id} = useParams()
    if (!id) return;
    
  
    const { register, handleSubmit, reset } = useForm<FileList>({});
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload animals"], {
        mutationFn: (data: FormData) => AnimalService.uploadAnimals(data, id),
        onSuccess: () => {
            alert("Животные успешно добавлены!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
    )

    const onSubmit: SubmitHandler<FileList> = async (data) => {
        const formData = new FormData();
        formData.append("file", data.item[0])


        mutate(formData)
    }
        

    return (
            

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                accept="text/csv"
                type="file" 
                {...register("item")} />
               
                <input type="submit"/>
            </form>
  
    );

}