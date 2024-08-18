import { BsFillTrash3Fill } from "react-icons/bs";
import { useDeleteItem } from "hooks/useDeleteItem";

interface DeleteItemProps {
  queryKeyId?: string;
  url: string;
  mutationKey: string;
  queryKey: string;
  alertMessage: string;
}

export function DeleteItem({
  queryKeyId,
  url,
  mutationKey,
  queryKey,
  alertMessage,
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
    <div>
      <BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal} />
    </div>
  );
}
