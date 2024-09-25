import { IVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { VetWorkCreateForm } from "./VetWorkCreateForm";
import { VetWorkCard } from "./VetWorkCard";
import { CreateItem } from "features/CreateItem";

interface VetWorkCardsProps {
  vetWorks: IVetwork[];
  invQueryName: string;
  imgSrc: string;
  url: string;
  btnTitle: string;
}

export function VetWorkCards({
  vetWorks,
  invQueryName,
  imgSrc,
  url,
  btnTitle,
}: VetWorkCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<VetWorkCreateForm url={url} queryKey={invQueryName} />}
      />

      {vetWorks.map((vetWork: IVetwork) => (
        <VetWorkCard
          key={vetWork.id}
          vetWork={vetWork}
          invQueryName={invQueryName}
          imgSrc={imgSrc}
        />
      ))}
    </>
  );
}
