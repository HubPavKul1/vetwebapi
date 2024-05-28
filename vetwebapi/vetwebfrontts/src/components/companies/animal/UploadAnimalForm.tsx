import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { CustomButton } from "../../CustomButton";
import { AppService } from "../../../app.service";

export function UploadAnimalForm() {
  const { id } = useParams();
  const url = `/api/companies/${id}/animals/upload`;

  const [currentFile, setCurrentFile] = useState<File>();
  const { reset } = useForm<FileList>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["upload animals"], {
    mutationFn: (data: FormData) => AppService.uploadFile(url, data),
    onSuccess: () => {
      alert("Животные успешно добавлены!");
      queryClient.invalidateQueries(["company", id]);
      reset();
    },
  });

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
  );
}
