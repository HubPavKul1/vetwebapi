import { BsFillTrash3Fill } from "react-icons/bs";
import { useDeleteItem } from "hooks/useDeleteItem";

interface DeleteItemProps {
  queryKeyId?: string;
  url: string;
  mutationKey: string;
  queryKey: string;
  alertMessage: string;
  size?: number
}

export function DeleteItem({
  queryKeyId,
  url,
  mutationKey,
  queryKey,
  alertMessage,
  size

}: DeleteItemProps) {
  const { mutate } = useDeleteItem(
    mutationKey,
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
      <BsFillTrash3Fill size={size} className="delete-icon" onClick={deleteAnimal} />
    </div>
  );
}
