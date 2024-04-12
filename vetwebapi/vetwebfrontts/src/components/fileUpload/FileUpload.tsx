import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import styles from "./FileUpload.module.scss";



interface FileUploadProps {
    itemId: number;
    uploadUrl: string;
    mutationName: string;
    invQueryName: string;
}

export function FileUpload({itemId, uploadUrl}: FileUploadProps) {
    const id = useId()
    const [image, setImage] = useState<File>()

    const { reset } = useForm<FileList>();
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload drugFile"], {
        mutationFn: async (data: FormData) => await axios.post(uploadUrl, data) 
        .then(response => console.log(response))
        .catch(err => console.log(err)),
        onSuccess: () => {
            alert("Файл успешно загружен!")
            queryClient.invalidateQueries(["drugs"])
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
        setImage(selectedFiles?.[0])

    } 
    // console.log("newFile>>>", image)

    return (
        <label 
            htmlFor={id}
            className={styles.fileLabel}>
            <input 
                type="file" 
                id={id}
                hidden
                accept="image/*"
                onChange={selectFile}
            />
            <img src="/emptyImage.jpg"/>
 
        </label>
    )
}