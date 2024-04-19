import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import { FileUpload } from "../fileUpload/FileUpload";


export function CatalogItem({...props}: ICardProps) {

    let url = "";
    props.url ? url = props.url : url = "/";
    return (
       
            <Col >
            
                <Container className={styles.catalogItem}>
                
                    {props.imgSrc ? 
                    <Link className={styles.cardImageLink} to={url}>
                        <img 
                            className={styles.cardImage} 
                            src={props.imgSrc}
                            alt={props.cardTitle}/> 
                    </Link>: 
                    <div className={styles.cardImageEmpty}>
                        {props.fileUploadUrl && 
                        <FileUpload
                            uploadUrl={props.fileUploadUrl}
                            accept="image/*"
                            mutationName="drugImage upload"
                            invQueryName="drugs"
                            imgSrc="/emptyImage.jpg"
                        />
                        }
                        
                        {/* {props.children} */}
                    </div>
                        
                    }
                
                    <div className={styles.card}>
                    <Link to={url}>
                        <h5 className={styles.cardTitle}>{props.cardTitle}</h5>
                    </Link>
                  
                    {
                            props.cardText ? 
                            <p className={styles.cardText}>{props.cardText}</p>: ""
                        }
                            
                        {
                            props.address &&
                            <p className={styles.cardText}>{props.address}</p>
                        }

                        {
                            props.employee &&
                            <h6>{props.employee}</h6>
                        }
                        
                        {
                            props.phone &&
                            <p className={styles.cardText}>{props.phone}</p>
                        }

                    </div>
                        
                    <div className={styles.services}>
                        { 
                            props.hasFile && props.fileUploadUrl && !props.fileSrc &&
                            <div className={styles.fileUpload}>
                                {/* <FaRegFilePdf className="pdf-icon"/> */}
                                <FileUpload
                                    uploadUrl={props.fileUploadUrl}
                                    accept="media_type"
                                    mutationName="drugInstr upload"
                                    invQueryName="drugs"
                                    imgSrc="/pdf.jpg"
                                />
                            </div>
                            
                        }
                        
                        <BsFillTrash3Fill className="delete-icon" onClick={props.onClick}/> 
                    </div>
                   
                </Container>
             
                
            </Col>
        
    )
}
