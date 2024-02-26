import { Layout } from "./components/Layout";
import { Home } from "./components/home/Home";
import { Companies } from "./components/companies/Companies";
import { CompanyDetail } from "./components/companies/company-detail/CompanyDetail";
import { Routes, Route } from "react-router-dom";


export function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}  />
                <Route path="companies" element={<Companies />} />
                <Route path="companies/:id" element={<CompanyDetail />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
        </> 
    )
}