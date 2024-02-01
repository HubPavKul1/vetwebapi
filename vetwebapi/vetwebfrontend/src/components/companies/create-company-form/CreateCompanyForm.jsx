import { useState } from "react";
import styles from "./CreateCompanyForm.module.css"

export default function CreateCompanyForm() {
    const [full_name, setFullName] = useState("")
    const [short_name, setShortName] = useState("")

    const createCompany = (e) => {
        e.preventDefault()    
        setCompanies(prev => [...prev, { id: prev.length + 1, full_name, short_name }])
    }

    return (
                <div>
                    <form className={styles.form}>
                        <div className="form-group">
                            {/* <label for="name" className="sr-only">Полное наименование</label> */}
                            <input 
                                type="full_name"  
                                name="full_name"  
                                className="form-control" 
                                id="full_name" 
                                placeholder="Полное наименование"
                                onChange={e => setFullName(e.target.value)} value={full_name}
                            />
                        </div>
                        <div className="form-group">
                            {/* <label for="name" className="sr-only">Сокращенное наименование</label> */}
                            <input 
                                type="short_name" 
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
                                onClick={e => createCompany(e)}
                            />
                        </div>
                    </form>
                </div>
        
    )
}