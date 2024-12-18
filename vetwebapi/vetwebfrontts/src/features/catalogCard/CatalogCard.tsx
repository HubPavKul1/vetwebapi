import { UploadDrugImage } from "features/drug/ui/UploadDrugImage";
import { UploadInstruction } from "features/drug/ui/UploadInstruction";
import { Col } from "react-bootstrap";
import {
  CatalogCardTitle,
  CatalogCardTop,
  CatalogCardWrapper,
  CatalogCardImage,
  CatalogCardBody,
  DeleteItem,
  CatalogCardFooter,
} from "shared/index";


interface CatalogCardProps {
  itemDetailUrl: string;
  cardTitle: string;
  imgSrc?: string;
  drugId?: number;
  invQueryName: string;
  isDrugCard?: boolean;
  children: React.ReactElement | React.ReactNode;
  delUrl: string;
  isDrugInstr?: boolean;
  topClassName?: string;
  bodyClassName?: string;
}
export function CatalogCard({ ...props }: CatalogCardProps) {
  return (
    <CatalogCardWrapper>
      <CatalogCardTop className={props.topClassName}>
        <Col sm={3}>
          {props.imgSrc && (
            <CatalogCardImage
              itemDetailUrl={props.itemDetailUrl}
              cardTitle={props.cardTitle}
              imgSrc={props.imgSrc}
            />
          )}
          {props.isDrugCard && props.drugId && !props.imgSrc && (
            <UploadDrugImage
              drugId={props.drugId}
              invQueryName={props.invQueryName}
            />
          )}
        </Col>
        <Col>
          <CatalogCardTitle
            itemDetailUrl={props.itemDetailUrl}
            cardTitle={props.cardTitle}
          />
        </Col>
      </CatalogCardTop>
      <CatalogCardBody className={props.bodyClassName}>{props.children}</CatalogCardBody>
      <CatalogCardFooter>
        <Col sm={8}></Col>
        <Col sm={2}>
          {props.isDrugCard && props.drugId && !props.isDrugInstr && (
            <UploadInstruction
              drugId={props.drugId}
              invQueryName={props.invQueryName}
            />
          )}
        </Col>
        <Col sm={2}>
          <DeleteItem
            queryKey={props.invQueryName}
            url={props.delUrl}
            alertMessage={`${props.cardTitle} успешно удалено!`}
          />
        </Col>
      </CatalogCardFooter>
    </CatalogCardWrapper>
  );
}
