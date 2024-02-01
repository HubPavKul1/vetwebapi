import axios from "axios"
import { useState, useEffect } from "react"
import classes from "./company-card/CompanyCard.module.css"
import CompanyCard from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import CreateCompanyForm from "./create-company-form/CreateCompanyForm"
import { Link } from "react-router-dom"


export default function Companies() {
    const [companies, setCompanies] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
        const data = await CompanyService.getAll()
          setCompanies(data)
        }
        fetchData()
      }, [])

    
    return (
  
            <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                        <h2>Предприятия</h2>
                        <p>
                            {/* <Link className="btn btn-primary btn-lg" to="/companies/add">Добавить предприятие</Link> */}
                            <a
                                className="btn btn-primary btn-lg"
                                href="#"
                              
                            >
                                Добавить предприятие
                            </a>
                        </p>
                       
                    </div>
                </div>
                <div className="row">
                    {companies.length ? companies.map(company =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    : <p>There are no companies</p>
                    }
                </div>
            </div>
        </div>
        
    )
}