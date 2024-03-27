import { Layout } from "./components/Layout";
import { Home } from "./components/pages/home/Home";
import { Companies } from "./components/pages/companyPages/Companies";
import { CompanyDetail } from "./components/companies/company-detail/CompanyDetail";
import { Routes, Route } from "react-router-dom";
import { DrugMovements } from "./components/drugs/DrugMovements";


export function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}  />
                <Route path="companies" element={<Companies />} />
                <Route path="drugs" element={<DrugMovements />} />
                <Route path="companies/:id" element={<CompanyDetail />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
        </> 
    )
}