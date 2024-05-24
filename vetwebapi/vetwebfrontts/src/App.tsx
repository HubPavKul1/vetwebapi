import { Layout } from "./components/Layout";
import { Home } from "./pages/home/Home";
import { Companies } from "./pages/companyPages/Companies";
import { CompanyDetail } from "./pages/companyPages/company-detail/CompanyDetail";
import { Routes, Route } from "react-router-dom";
import { DrugReceipts } from "./pages/drugPages/DrugReceipts";
import { Drugs } from "./pages/drugPages/Drugs";
import { DrugDetail } from "./pages/drugPages/drugDetail/DrugDetail";
import { DrugCatalog } from "./pages/drugPages/DrugCatalog";
import { ReceiptDetail } from "./pages/drugPages/receiptDetail/ReceiptDetail";
import { Vets } from "./pages/companyPages/Vets";
import { Vaccinations } from "./pages/vetWorkPages/vaccination/Vaccinations";
import { VaccinationDetail } from "./pages/vetWorkPages/vaccination/vaccinationDetail/VaccinationDetail";



export function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}  />
                <Route path="companies" element={<Companies />} />
                <Route path="companies/vets" element={<Vets />} />
                <Route path="drugs/receipts" element={<DrugReceipts />} />
                <Route path="drugs/receipts/:id" element={<ReceiptDetail />} />
                <Route path="drugs" element={<Drugs/>} />
                <Route path="drugs/catalog" element={<DrugCatalog/>} />
                <Route path="vetwork/vaccinations" element={<Vaccinations/>} />
                <Route path="vetwork/:id" element={<VaccinationDetail/>} />
                <Route path="companies/:id" element={<CompanyDetail />} />
                <Route path="drugs/:id" element={<DrugDetail />} />
                
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
        </> 
    )
}