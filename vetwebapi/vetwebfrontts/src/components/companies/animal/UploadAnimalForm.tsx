import { ChangeEvent } from "react";
import { AnimalService } from "../company.service";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

// interface UploadFile {
//     file: Blob
// }

// interface Files {
//     files: UploadFile[];
// }

export function UploadAnimalForm() {

    const {id} = useParams()
    if (!id) return;
    
  
    const { register, handleSubmit, reset } = useForm<FileList>({});
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload animals"], {
        mutationFn: (data: File) => AnimalService.uploadAnimals(data, id),
        onSuccess: () => {
            alert("Животные успешно добавлены!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
    )

    // const onSubmit: SubmitHandler<FileList> = async (data) => {
    //     console.log("DATA>>>", data.item[0])

       // const formData = new FormData()

        // mutate(data.item[0])}
        

    const onChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        mutate(file)
    }

    return (
        <div className="form-group">
            <form >
                {/* <input type="file" {...register("item")} /> */}
                <input type="file" onChange={onChange} />

                {/* <input type="submit" className="btn btn-primary btn-send-message btn-md"/> */}
            </form>
        </div>     
  
    );

}