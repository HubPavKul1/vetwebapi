import { useId, useState } from "react";
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { IDrug } from "../../../interfaces/DrugInterfaces";
import { DrugService } from "../drugs.service";


import styles from "./UploadFileForm.module.scss"

interface UploadDrugFileFormProps {
    drug: IDrug;
    children?: React.ReactElement | React.ReactNode;
}

export function UploadFileForm({drug, children}: UploadDrugFileFormProps) {

    
    const [currentFile, setCurrentFile] = useState<File>();
    const id = useId()
    const { reset } = useForm<FileList>();
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["upload drugFile"], {
        mutationFn: (data: FormData) => DrugService.uploadFile(data, drug.id?.toString()),
        onSuccess: () => {
            alert("Файл успешно загружен!")
            queryClient.invalidateQueries(["drugs"])
            reset()
        }
    },
    )

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);

    } 

    const upload = () => {
        if (!currentFile) return;
        const formData = new FormData();
        formData.append("file", currentFile)
        mutate(formData)
    }

    // upload()

    

    

    return (

        // <div className="container">
            <div className={styles.root}>
                
                <label 
                // className={styles.label} 
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