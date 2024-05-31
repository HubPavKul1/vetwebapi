import { useId } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import styles from "./FileUpload.module.scss";



interface FileUploadProps {
    accept?: string;
    uploadUrl?: string;
    mutationName?: string;
    invQueryName?: string;
    iconSrc?: string;
}

export function FileUpload({uploadUrl, accept, mutationName, invQueryName, iconSrc}: FileUploadProps) {
    const id = useId()
    
    const { reset } = useForm<FileList>();
    const queryClient = useQueryClient()

    const { mutate } = useMutation([{mutationName}], {
        mutationFn: async (data: FormData) => await axios.post(uploadUrl, data) 
        .then(response => console.log(response))
        .catch(err => console.log(err)),
        onSuccess: () => {
            alert("Файл успешно загружен!")
            queryClient.invalidateQueries([{invQueryName}])
            reset()
        }
    },
    )

    const upload = async(currentFile: File) => {
        if (!currentFile) return;
        const formData = new FormData();
        formData.append("file", currentFile)
        mutate(formData)
    }

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        upload(selectedFiles?.[0]);

    } 
   

    return (
        <label 
            htmlFor={id}
            className={styles.fileLabel}>
            <input 
                type="file" 
                id={id}
                hidden
                accept={accept}
                onChange={selectFile}
            />
            <img src={iconSrc}/>
 
        </label>
    )
}