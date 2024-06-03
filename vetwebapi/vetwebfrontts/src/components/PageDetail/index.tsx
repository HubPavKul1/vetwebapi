import { Col, Container, Row } from "react-bootstrap";
import { PageDetailTop } from "./PageDetailTop";
import styles from "./PageDetail.module.scss"
import { PageDetailTitle } from "./PageDetailTitle";
import { PageDetailAddress } from "./PageDetailAddress";
import { IAddress } from "../../interfaces/AddressInterfaces";
import { PageDetailEmployees } from "./PageDetailEmployees";
import { IEmployee } from "../../interfaces/EmployeeInterfaces";
import { PageDetailAnimals } from "./PageDetailAnimals";
import { IAnimal } from "../../interfaces/AnimalInterfaces";

interface PageDetailProps {
  imgSrc: string;
  alt: string;
  menu: React.ReactElement;
  title: string;
  address?: IAddress;
  employees?: IEmployee[]
  companyId?: number;
  animals?: IAnimal[];

}

export function PageDetail({ ...props }: PageDetailProps) {
  return (
    <Container className={styles.pageDetailWrap}>
      <PageDetailTop imgSrc={props.imgSrc} alt={props.alt} menu={props.menu} />
      <PageDetailTitle title={props.title}/>
      <PageDetailAddress address={props.address} />
      <PageDetailEmployees employees={props.employees}/>
      <PageDetailAnimals animals={props.animals} companyId={props.companyId} />

      
    </Container>
  );
}
