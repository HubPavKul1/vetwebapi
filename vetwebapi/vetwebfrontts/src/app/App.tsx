import { Layout } from "app/Layout";
import { Companies, CompanyDetail, Labs, Vets } from "pages/company";
import {
  DrugCatalog,
  DrugCatalogDetail,
  DrugDetail,
  DrugReceipts,
  Drugs,
  ReceiptDetail,
} from "pages/drug";
import { DrugReportMainPage } from "pages/drug/drugReports";
import { Home } from "pages/home";
import {
  Diagnostics,
  Vaccinations,
  VetWorkPageDetail,
} from "pages/vetWorkPages";
import { VetWorkReportMainPage } from "pages/vetWorkPages/reports";
import { Treatments } from "pages/vetWorkPages/Treatments";

import { Routes, Route } from "react-router-dom";

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
          <Route path="drugs/catalog/:id" element={<DrugCatalogDetail />} />
          <Route path="vetwork/vaccinations" element={<Vaccinations />} />
          <Route path="vetwork/diagnostics" element={<Diagnostics />} />
          <Route path="vetwork/treatments" element={<Treatments />} />
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
