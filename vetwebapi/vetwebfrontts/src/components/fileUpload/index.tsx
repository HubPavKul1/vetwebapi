import { useId } from "react";
import { useForm } from "react-hook-form";
import styles from "./FileUpload.module.scss";
import { Container } from "react-bootstrap";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { useUpload } from "../../hooks/useUpload";

interface FileUploadProps {
  accept?: string;
  uploadUrl: string;
  mutationName: string;
  invQueryName: string;
  iconSrc?: string;
}

export function FileUpload({
  uploadUrl,
  accept,
  mutationName,
  invQueryName,
  iconSrc,
}: FileUploadProps) {
  const id = useId();

  const { reset } = useForm<FileList>();

  const { mutate} = useUpload(
    mutationName,
    uploadUrl,
    invQueryName,
    "Файл успешно загружен!",
    reset
  );

 
  const upload = async (currentFile: File) => {
    if (!currentFile) return;
    const formData = new FormData();
    formData.append("file", currentFile);
    mutate(formData);
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    upload(selectedFiles?.[0]);
  }; 

  return (
    <Container className="max-h-4 hover:scale-125 transition-transform cursor-pointer">
      <label htmlFor={id} className={styles.fileLabel}>
        <input
          type="file"
          id={id}
          hidden
          accept={accept}
          onChange={selectFile}
        />
        <img src={iconSrc} />
        <LiaFileDownloadSolid fontSize={20} color="red"/>
      </label>
    </Container>
  );
}
