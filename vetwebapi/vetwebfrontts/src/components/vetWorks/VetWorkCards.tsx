import { CreateItem } from "components/CreateItem";
import { IVetwork } from "interfaces/VetWorkInterfaces";
import { VetWorkCreateForm } from "./VetWorkCreateForm";
import { VetWorkCard } from "./VetWorkCard";

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
          vetWork={vetWork}
          invQueryName={invQueryName}
          imgSrc={imgSrc}
        />
      ))}
    </>
  );
}
