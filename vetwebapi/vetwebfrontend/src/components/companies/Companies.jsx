import axios from "axios"
import { useState, useEffect } from "react"
import classes from "./company_card/CompanyCard.module.css"
import CompanyCard from "./company_card/CompanyCard"
import { CompanyService } from "./company.service"

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