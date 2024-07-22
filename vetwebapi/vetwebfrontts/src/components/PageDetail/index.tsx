
import { PageDetailTop } from "./PageDetailTop";
import { PageDetailTitle } from "./PageDetailTitle";
import { PageDetailAddress } from "./PageDetailAddress";
import { IAddress } from "../../interfaces/AddressInterfaces";
import { PageDetailEmployees } from "./PageDetailEmployees";
import { IEmployee } from "../../interfaces/EmployeeInterfaces";
import { PageDetailAnimals } from "./PageDetailAnimals";
import { IAnimal } from "../../interfaces/AnimalInterfaces";
import { PageWrapper } from "../PageWrapper";

interface PageDetailProps {
  imgSrc: string;
  alt: string;
  menu: React.ReactElement;
  title: string;
  address?: IAddress;
  employees?: IEmployee[]
  companyId?: number;
  animals?: IAnimal[];
  children?: React.ReactElement;

}

export function PageDetail({ ...props }: PageDetailProps) {
  return (
    <PageWrapper>
      <PageDetailTop imgSrc={props.imgSrc} alt={props.alt} menu={props.menu} />
      <PageDetailTitle title={props.title}/>
      {props.address && <PageDetailAddress address={props.address} />}
      {props.employees && <PageDetailEmployees employees={props.employees}/>}
      {(props.animals && props.companyId) && <PageDetailAnimals animals={props.animals} companyId={props.companyId} /> }
      {props.children}
    </PageWrapper>
  );
}
