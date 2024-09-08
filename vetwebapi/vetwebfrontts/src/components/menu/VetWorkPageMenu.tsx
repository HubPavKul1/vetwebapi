import { Menu } from "../Menu";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";
import { CustomButton } from "../CustomButton";
import { Container } from "react-bootstrap";
import { FileUpload } from "components/FileUpload";
import { vetWorkFileUploadUrl } from "urls/vetWorkUrls";
import { useParams } from "react-router-dom";

interface VetWorkPageMenuProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
  showReferral: CallableFunction;
  showReferralAnimalList: CallableFunction;
  showAccountingAct: CallableFunction;
  workType: string;
  disease: string;
}

export function VetWorkPageMenu({
  showAct,
  showAnimalsList,
  showReferral,
  showReferralAnimalList,
  showAccountingAct,
  workType,
  disease,

}: VetWorkPageMenuProps) {
  const {id} = useParams()
  const vetWorkId = Number(id)
  const menuButtons = [
    {
      id: 1,
      element:
        workType !== "диагностика" ? (
          <CustomButton
            className="btn-submit"
            title="Акт на обработку"
            onClick={() => showAct(true)}
          />
        ) : disease !== "туберкулез" ? (
          <CustomButton
            className="btn-submit"
            title="Сопроводительная"
            onClick={() => showReferral(true)}
          />
        ) : (
          <>
            <CustomButton
              className="btn-submit mb-3"
              title="Акт на туберкулинизацию"
              onClick={() => showAct(true)}
            />

            <CustomButton
              className="btn-submit mb-2"
              title="Акт учета реакции"
              onClick={() => showAccountingAct(true)}
            />
          </>
        ),
    },

    {
      id: 2,
      element:
        workType === "диагностика" && disease !== "туберкулез" ? (
          <CustomButton
            className="btn-submit"
            title="Опись к сопроводительной"
            onClick={() => showReferralAnimalList(true)}
          />
        ) : (
          <CustomButton
            className="btn-submit"
            title="Опись животных"
            onClick={() => showAnimalsList(true)}
          />
        ),
    },
    {
      id: 3,
      element: (
        <Container className="flex justify-center items-center w-full pt-2 pb-4  border-2 border-violet-400 rounded-md text-lg text-violet-400 uppercase font-bold">
          <div>Загрузите документ</div>
          <div>
            <FileUpload
              uploadUrl={vetWorkFileUploadUrl(vetWorkId)}
              accept=".pdf"
              mutationName="uploadVetWorkFile"
              invQueryName="vetwork"
              fontSize={40}
              color="violet"
              id={id}
            />
          </div>
        </Container>
      ),
    },
  ];

  return (
    <Menu buttons={menuButtons}>
      <AddCompanyToVetWork />
      <AddDrugToVetWork />
    </Menu>
  );
}
