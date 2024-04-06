```jsx
// файл Companies.jsx

import axios from "axios"
import { useState, useEffect } from "react"
import classes from "./company-card/CompanyCard.module.css"
import CompanyCard from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"

import { Link } from "react-router-dom"
import CreateCompany from "./CreateCompany"
import { useQuery } from "react-query"


export default function Companies() {
    // const [companies, setCompanies] = useState([])
    const { data, isLoading, error } = useQuery(['companies'], () => CompanyService.getAll()
    )
    
    if(isLoading) return <p>Загрузка ...</p>
    // useEffect(() => {
    //     const fetchData = async () => {
    //     const data = await CompanyService.getAll()
    //       setCompanies(data)
    //     }
    //     fetchData()
    //   }, [])
    
    return (
  
            <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    <CreateCompany />
                </div>
                <div className="row">
                    {data.length ? data.map(company =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    : <p>There are no companies</p>
                    }
                </div>
            </div>
        </div>
        
    )
}
```


# React-hook-form  https://react-hook-form.com/get-started

```jsx

// CreateCompanyForm.jsx

import { useState, useEffect } from "react";
import styles from "./CreateCompanyForm.module.css"
import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"

export default function CreateCompanyForm({submitting}) {
    const [full_name, setFullName] = useState("")
    const [short_name, setShortName] = useState("")

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const createCompany = async (data) => {
        // e.preventDefault()

        console.log("data+++", data)
        console.log(data.full_name)

        // await CompanyService.createCompany(data.full_name, data.short_name)
        reset()
    }   

    // console.log(errors.full_name)
     

    return (

        <form action="companies/new"  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                    // onChange={e => setFullName(e.target.value)} value={full_name}
                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
          
            <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    name="short_name" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                    // onChange={e => setShortName(e.target.value)} value={short_name}
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                    // disabled={submitting}
                    // onClick={e => createCompany(e)}
                />
            </div>
        </form>               
        
    )
}

```

```jsx
// CreateCompanyForm.jsx

import { useState, useEffect } from "react";
import styles from "./CreateCompanyForm.module.css"
import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"
import { QueryClient, useMutation, useQueryClient } from "react-query";

export default function CreateCompanyForm() {
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create company"], (data) => CompanyService.createCompany(data.full_name, data.short_name), {
        onSuccess: () => {
            queryClient.invalidateQueries(["companies"])
        }
    })

    const createCompany = data => {
    
        mutate(data)

    }   

     

    return (

        <form action="companies/new"  method="post" onSubmit={handleSubmit(createCompany)}>
            <div className="form-group">
                <label htmlFor="full_name" className="sr-only">Полное наименование</label>
                <input 
                    type="text"  
                    name="full_name"  
                    className="form-control" 
                    id="full_name" 
                    placeholder="Полное наименование"
                    {...register("full_name", {required: "Full_name is required!"})}

                />
                {errors?.full_name?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
          
            <div className="form-group">
                <label htmlFor="short_name" className="sr-only">Сокращенное наименование</label>
                <input 
                    type="text" 
                    name="short_name" 
                    className="form-control" 
                    id="short_name" 
                    placeholder="Сокращенное наименование" 
                    {...register("short_name", { required: "Short_name is required" })}
                />
                {errors?.short_name?.message && <p style={{color: "red"}}>Поле должно быть заполнено!</p>}
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    id="btn-submit" 
                    className="btn btn-primary btn-send-message btn-md" 
                    value="Зарегистрировать" 
                    
                />
            </div>
        </form>               
        
    )
}

```
