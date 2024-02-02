import { useState, useEffect } from "react";
import styles from "./CreateCompanyForm.module.css"
// import { Form, redirect } from "react-router-dom"
import axios from "axios";

export default function CreateCompanyForm({ submitting }) {
    const [full_name, setFullName] = useState("")
    const [short_name, setShortName] = useState("")

    const createCompany = (e) => {
        e.preventDefault()
    }    
        

    return (

        <form action="companies/new"  method="post">
            <div className="form-group">
                <label for="name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    onChange={e => setFullName(e.target.value)} value={full_name}
                />
            </div>
          
            <div className="form-group">
                <label for="name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    name="short_name" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    onChange={e => setShortName(e.target.value)} value={short_name}
                />
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                    disabled={submitting}
                    onClick={e => createCompany(e)}
                />
            </div>
        </form>               
        
    )
}
