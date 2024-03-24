import { MouseEventHandler, useState } from "react";
import { AnimalService } from "../company.service";
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Button } from "../../Button";


export function UploadAnimalForm() {

    const {id} = useParams()
    if (!id) return;
    
    const [currentFile, setCurrentFile] = useState<File>();
    const { reset } = useForm<FileList>();
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

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);

    } 

    const upload: MouseEventHandler<HTMLButtonElement> = async () => {
        if (!currentFile) return;
        const formData = new FormData();
        formData.append("file", currentFile)
        mutate(formData)
    }
        

    return (

        <div className="container">
            <div className="container">
                <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
                </label>
            </div>
    
            <div className="container">
                <Button 
                    className="btn btn-reset btn-upload"
                    disabled={!currentFile}
                    onClick={upload}
                    name="Загрузить"
                />
                
            </div>
        </div>

    )

}