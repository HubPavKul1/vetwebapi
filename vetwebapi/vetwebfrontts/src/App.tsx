import { Layout } from "./components/Layout";
import { Home } from "./components/pages/home/Home";
import { Companies } from "./components/pages/companyPages/Companies";
import { CompanyDetail } from "./components/pages/companyPages/company-detail/CompanyDetail";
import { Routes, Route } from "react-router-dom";
import { DrugReceipts } from "./components/pages/drugPages/DrugReceipts";
import { Drugs } from "./components/pages/drugPages/Drugs";
import { DrugDetail } from "./components/pages/drugPages/drugDetail/DrugDetail";


export function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}  />
                <Route path="companies" element={<Companies />} />
                <Route path="drugs/receipts" element={<DrugReceipts />} />
                <Route path="drugs" element={<Drugs/>} />
                <Route path="companies/:id" element={<CompanyDetail />} />
                <Route path="drugs/:id" element={<DrugDetail />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
        </> 
    )
}