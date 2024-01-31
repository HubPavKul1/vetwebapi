
import classes from "./CompanyCard.module.css"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function CompanyCard({company}) {
    return (
        <div className="col-md-4 animate-box">
                        <div className="services">
                            <span className="icon">
                                <i className="flaticon-healthy-1" />
                            </span>
                            <div className="desc">
                                <h3>
                                    <Link to={`/companies/${company.id}`} >{company.full_name}</Link>
                                </h3>
                                <p>
                                    The Big Oxmox advised her not to do so, because there were
                                    thousands of bad Commas
                                </p>
                            </div>
                        </div>
                    </div>
    )
}