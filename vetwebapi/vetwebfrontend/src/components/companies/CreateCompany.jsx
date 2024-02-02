import CreateCompanyForm from "./create-company-form/CreateCompanyForm";
import Modal from "../modal/Modal"
import { useState } from "react";

export default function CreateCompany() {

    const [modalActive, setModalActive] = useState(false)
    return (
        <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                        <h2>Предприятия</h2>
                        <p>
                            <button className="btn-primary btn-lg" onClick={() => setModalActive(true)}>
                                Добавить предприятие
                            </button>
                        </p>
                         <Modal active={modalActive} setActive={setModalActive}>
                            <CreateCompanyForm />
                         </Modal>           
        </div>
    )
}


// Отправка данных на сервер
const createCompany = async ({body}) => {
    // const body = {"full_name": full_name, "short_name": short_name}
    const headers = { "Content-Type": "application-json" }
    const newCompany = await axios.post("/api/companies", body, { headers }).then((response) => {
        console.log(response.status, response.data);
      });
    return newCompany
}



// Получение данных формы
export  const createCompanyAction = async ({request}) => {
    const formData = await request.formData();
    const newCompanyData = {
        full_name: formData.get("full_name"),
        short_name: formData.get("short_name")
    }
    const company = await createCompany(newCompanyData)

    // return redirect("/companies" + company.id)
}