
import classes from "./CompanyCard.module.css"
import { Link } from "react-router-dom"

export default function CompanyCard({car}) {
    return (
        <div className="col-md-4 animate-box">
                        <div className="services">
                            <span className="icon">
                                <i className="flaticon-healthy-1" />
                            </span>
                            <div className="desc">
                                <h3>
                                    {/* <a href="">No Companies</a> */}
                                    <Link to={car.id} >No Companies</Link>
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