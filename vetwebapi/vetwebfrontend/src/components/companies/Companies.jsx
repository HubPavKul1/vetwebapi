import axios from "axios"
import { useState, useEffect } from "react"
import classes from "./company-card/CompanyCard.module.css"
import CompanyCard from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"

import { Link } from "react-router-dom"
import CreateCompany from "./CreateCompany"


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
                    <CreateCompany />
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