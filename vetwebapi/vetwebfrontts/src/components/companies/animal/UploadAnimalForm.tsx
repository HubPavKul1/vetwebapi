import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CustomButton } from "../../CustomButton";
import { useUpload } from "../../../hooks/useUpload";

export function UploadAnimalForm() {
  const { id } = useParams();
  const url = `/api/companies/${id}/animals/upload`;

  const [currentFile, setCurrentFile] = useState<File>();
  const { reset } = useForm<FileList>();

  const { mutate } = useUpload(
    "uploadAnimals",
    url,
    "company",
    "Животные успешно добавлены!",
    reset,
    id
  );


  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const upload: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!currentFile) return;
    const formData = new FormData();
    formData.append("file", currentFile);
    mutate(formData);
  };

  return (
    <div className="container p-2">
      <div className="container text-md">
        <label className="btn-default">
          <input className="text-sm" type="file" onChange={selectFile} />
        </label>
      </div>

      <div className="container">
        <CustomButton
          className="btn-upload w-full"
          disabled={!currentFile}
          onClick={upload}
          title="Загрузить"
        />
      </div>
    </div>
  );
}
