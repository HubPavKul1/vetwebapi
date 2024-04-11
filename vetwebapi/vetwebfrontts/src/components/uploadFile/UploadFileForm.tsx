import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { DrugService } from "../drugs/drugs.service";


import styles from "./UploadFileForm.module.scss"

interface UploadFileFormProps {
    itemId: string;
    children?: React.ReactElement | React.ReactNode;
}

export function UploadFileForm({itemId, children}: UploadFileFormProps) {

    const id = useId()
    const { reset } = useForm<FileList>();
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload drugFile"], {
        mutationFn: (data: FormData) => DrugService.uploadFile(data, itemId),
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
        upload(selectedFiles?.[0])

    } 

    

    return (
            <div className={styles.root}>
                <label 
                htmlFor={id}>
                    {children}
                    <input 
                        className={styles.input}
                        id={id} 
                        type="file" 
                        onChange={selectFile}
                        />
                </label>
            </div>
    )

}