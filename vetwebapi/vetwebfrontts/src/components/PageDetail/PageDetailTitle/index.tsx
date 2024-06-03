import { Container } from "react-bootstrap";

import styles from "./PageDetailTitle.module.scss"

interface PageDetailTitleProps {
  title: string;

}

export function PageDetailTitle({ title }: PageDetailTitleProps) {
  return (
    <Container className={styles.titleWrap}>
      <h1>
        <a href="#">{title}</a>
      </h1>
    </Container>
  );
}
