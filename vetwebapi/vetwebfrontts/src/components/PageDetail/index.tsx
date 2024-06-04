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
  children?: React.ReactElement;

}

export function PageDetail({ ...props }: PageDetailProps) {
  return (
    <Container className={styles.pageDetailWrap}>
      <PageDetailTop imgSrc={props.imgSrc} alt={props.alt} menu={props.menu} />
      <PageDetailTitle title={props.title}/>
      {props.address && <PageDetailAddress address={props.address} />}
      {props.employees && <PageDetailEmployees employees={props.employees}/>}
      {(props.animals && props.companyId) && <PageDetailAnimals animals={props.animals} companyId={props.companyId} /> }
      {props.children}
    </Container>
  );
}
