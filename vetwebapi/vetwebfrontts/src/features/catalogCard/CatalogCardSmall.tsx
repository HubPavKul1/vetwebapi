import { Col } from "react-bootstrap";
import {
  CatalogCardTitle,
  CatalogCardWrapper,
  CatalogCardImage,
  DeleteItem,
  CatalogCardFooter,
  CatalogCardBodySmall,
  CatalogCardTopSmall,
} from "shared/index";

interface CatalogCardSmallProps {
  itemDetailUrl: string;
  cardTitle: string;
  imgSrc?: string;
  invQueryName: string;
  children: React.ReactElement | React.ReactNode;
  delUrl: string;
}
export function CatalogCardSmall({ ...props }: CatalogCardSmallProps) {
  return (
    <CatalogCardWrapper>
      <CatalogCardTopSmall>
        <Col sm={3}>
          {props.imgSrc && (
            <CatalogCardImage
              itemDetailUrl={props.itemDetailUrl}
              cardTitle={props.cardTitle}
              imgSrc={props.imgSrc}
            />
          )}
        </Col>
        <Col>
          <CatalogCardTitle
            itemDetailUrl={props.itemDetailUrl}
            cardTitle={props.cardTitle}
          />
        </Col>
      </CatalogCardTopSmall>

      <CatalogCardBodySmall>{props.children}</CatalogCardBodySmall>

      <CatalogCardFooter>
        <Col sm={8}></Col>
        <Col sm={2}></Col>
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
