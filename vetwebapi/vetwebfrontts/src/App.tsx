import { Layout } from "./components/Layout";
import { Home } from "./pages/home/Home";
import { Companies } from "./pages/companyPages/Companies";
import { CompanyDetail } from "./pages/companyPages/CompanyDetail";
import { Routes, Route } from "react-router-dom";
import { DrugReceipts } from "./pages/drugPages/DrugReceipts";
import { Drugs } from "./pages/drugPages/Drugs";
import { DrugDetail } from "./pages/drugPages/DrugDetail";
import { DrugCatalog } from "./pages/drugPages/DrugCatalog";
import { ReceiptDetail } from "./pages/drugPages/receiptDetail/ReceiptDetail";
import { Vets } from "./pages/companyPages/Vets";
import { Vaccinations } from "./pages/vetWorkPages/Vaccinations";
import { DrugReportMainPage } from "./pages/drugPages/drugReports/DrugReportMainPage";
import { Diagnostics } from "./pages/vetWorkPages/Diagnostics";
import { VetWorkPageDetail } from "./pages/vetWorkPages/VetWorkPageDetail";
import { Labs } from "./pages/companyPages/Labs";
import { VetWorkReportMainPage } from "./pages/vetWorkPages/reports/vetWorkReportMainPage";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/vets" element={<Vets />} />
          <Route path="companies/labs" element={<Labs />} />
          <Route path="drugs/receipts" element={<DrugReceipts />} />
          <Route path="drugs/receipts/:id" element={<ReceiptDetail />} />
          <Route path="drugs" element={<Drugs />} />
          <Route path="drugs/catalog" element={<DrugCatalog />} />
          <Route path="vetwork/vaccinations" element={<Vaccinations />} />
          <Route path="vetwork/diagnostics" element={<Diagnostics />} />
          <Route path="vetwork/:id" element={<VetWorkPageDetail />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
          <Route path="drugs/:id" element={<DrugDetail />} />
          <Route path="drugs/reports" element={<DrugReportMainPage />} />
          <Route path="vetwork/reports" element={<VetWorkReportMainPage />} />

          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}
