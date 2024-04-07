import { Layout } from "./components/Layout";
import { Home } from "./components/pages/home/Home";
import { Companies } from "./components/pages/companyPages/Companies";
import { CompanyDetail } from "./components/companies/company-detail/CompanyDetail";
import { Routes, Route } from "react-router-dom";
import { DrugReceipts } from "./components/pages/drugPages/DrugReceipts";
import { Drugs } from "./components/pages/drugPages/Drugs";


export function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}  />
                <Route path="companies" element={<Companies />} />
                <Route path="drugs/1" element={<DrugReceipts />} />
                <Route path="drugs" element={<Drugs/>} />
                <Route path="companies/:id" element={<CompanyDetail />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
        </> 
    )
}