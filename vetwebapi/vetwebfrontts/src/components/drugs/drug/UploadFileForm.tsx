import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { CustomButton } from "../../button/CustomButton";
import { IDrug } from "../../../interfaces/DrugInterfaces";
import { DrugService } from "../drugs.service";

interface UploadDrugFileFormProps {
    drug: IDrug;
}

export function UploadDrugFileForm({drug}: UploadDrugFileFormProps) {

    
    const [currentFile, setCurrentFile] = useState<File>();
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

    const upload: MouseEventHandler<HTMLButtonElement> = async () => {
        if (!currentFile) return;
        const formData = new FormData();
        formData.append("file", currentFile)
        mutate(formData)
    }
        

    return (

        <div className="container">
            <div className="container">
                <label className="btn-default">
                <input type="file" onChange={selectFile} />
                </label>
            </div>
    
            <div className="container">
                <CustomButton
                    className="btn-upload" 
                    disabled={!currentFile}
                    onClick={upload}
                    title="Загрузить"
                />  
            </div>
        </div>

    )

}