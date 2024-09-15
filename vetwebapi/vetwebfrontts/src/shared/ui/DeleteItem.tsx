import { BsFillTrash3Fill } from "react-icons/bs";
import { useDeleteItem } from "shared/hooks/useDeleteItem";

interface DeleteItemProps {
  queryKeyId?: string;
  url: string;
  queryKey: string;
  alertMessage: string;
  size?: number;
}

export function DeleteItem({
  queryKeyId,
  url,
  queryKey,
  alertMessage,
  size,
}: DeleteItemProps) {
  const { mutate } = useDeleteItem(
    url,
    queryKey,
    alertMessage,
    queryKeyId
  );

  const deleteAnimal = () => {
    mutate();
  };

  return (
    <div className="flex justify-center">
      <BsFillTrash3Fill
        size={size}
        className="delete-icon"
        onClick={deleteAnimal}
      />
    </div>
  );
}
