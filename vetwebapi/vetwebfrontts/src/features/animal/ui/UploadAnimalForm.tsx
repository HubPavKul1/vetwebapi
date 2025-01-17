import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useUpload } from "shared/hooks/useUpload";
import { uploadAnimalsUrl } from "shared/urls/companyUrls";
import clsx from "clsx";
import { ButtonCreate, CustomButton } from "shared/index";

export function UploadAnimalForm() {
  const { id } = useParams();
  if (!id) return;
  const companyId = Number(id);

  const [currentFile, setCurrentFile] = useState<File>();
  const { reset } = useForm<FileList>();

  const { mutate } = useUpload(
    reset,
    uploadAnimalsUrl(companyId),
    "company",
    "uploadAnimals",
    "Животные успешно добавлены!",
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
    <div className="container p-2 ">
      <div className="container text-md bg-inherit">
        <label className="btn-default bg-inherit">
          <input className="text-sm" type="file" onChange={selectFile} />
        </label>
      </div>

      <div className="container">
        <CustomButton
          className={clsx(
            !currentFile ? "btn-upload-disabled" : "btn-upload w-full"
          )}
          disabled={!currentFile}
          onClick={upload}
          title="Загрузить"
        />
      </div>
    </div>
  );
}
