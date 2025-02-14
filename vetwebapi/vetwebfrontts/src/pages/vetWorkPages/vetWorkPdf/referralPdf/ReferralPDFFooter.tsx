import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

interface ReferralPDFFooterProps {
  data: IVetWorkSchema;
}

export function ReferralPDFFooter({ data }: ReferralPDFFooterProps) {
  if (!data.animals) return;
  if (!data.companies?.length) return;

  const doctor = data.doctors[0].fullname;

  const companyDoctor = data.companies[0]?.employee?.fullname;

  return (
    <Container className="text-lg">
      <Row className="font-bold">
        <Col sm={3}>Испытания провести согласно:</Col>
        <Col sm={2}>Области аккредитации</Col>
        <Col sm={1}>
          <div className="w-20 h-10 border-2 border-black"></div>
        </Col>
        <Col sm={3}>Вне области аккредитации</Col>
        <Col sm={1}>
          <div className="w-20 h-10 border-2 border-black"></div>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row>
        <Col sm={8}>
          Право выбора оптимального метода и методики испытания проб(ы) оставляю
          за лабораторией:
        </Col>
        <Col>да</Col>
        <Col>
          <div className="w-10 h-10 border-2 border-black"></div>
        </Col>
        <Col></Col>
        <Col>нет</Col>
        <Col>
          <div className="w-10 h-10 border-2 border-black"></div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          ПРЕДОСТАВЛЕНИЕ СВЕДЕНИЙ ОБ ОЦЕНЕННОЙ НЕОПРЕДЕЛЕННОСТИ В ПРОТОКОЛЕ
          ЛАБОРАТОРНЫХ ИСПЫТАНИЙ:
        </Col>
        <Col>да</Col>
        <Col>
          <div className="w-10 h-10 border-2 border-black"></div>
        </Col>
        <Col>нет</Col>
        <Col>
          <div className="w-10 h-10 border-2 border-black"></div>
        </Col>
      </Row>
      <Row className="font-bold mb-2">
        <Col sm={12}>
          Прошу оригинал / копию (ненужное зачеркнуть) результата исследования:
        </Col>
      </Row>
      <Row>
        <Col sm={2}>Выдать на руки:</Col>
        <Col sm={1}>
          <div className="w-12 h-7 border-2 border-black text-center"></div>
        </Col>
        <Col sm={9}></Col>
      </Row>
      <Row>
        <Col sm={4}>Отправить по электронной почте:</Col>
        <Col sm={1}>
          <div className="w-12 h-7 border-2 border-black text-center"></div>
        </Col>

        <Col className="pdf-report-underlined">gosvetnadsor_ivgor@mail.ru</Col>
      </Row>
      <Row>
        <Col sm={4}></Col>
        <Col></Col>

        <Col sm={6} className="text-center text-sm">
          (указать адрес электронной почты)
        </Col>
      </Row>
      <Row>
        <Col sm={7}>
          Количество необходимых экземпляров результатов исследований:
        </Col>
        <Col sm={5} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="font-bold">
        <Col>Заказчик уведомлен и дает свое согласие на: </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <p className="text-lg">
            Обработку персональных данных <br />
            Сроки проведения испытаний <br />
            Оплату всех расходов за проведение испытаний <br />
            Не возврат и списание образцов после проведения испытаний без
            представителя заказчика <br />
            Лаборатория не несет ответственность за стадию отбора, условия
            доставки образца(-ов), представленного(-ых) заказчиком для
            исследований <br />
            Лаборатория не дает оценку соответствия продукции, не выдает
            заключений о выданных результатах исследований. <br />
            Информация, указанная в данной заявке, будет отражена в протоколе
            испытаний. <br />
            За информацию, предоставленную заказчиком, лаборатория
            ответственности не несет. <br />
            В случае получения результата, не соответствующего требованиям НД,
            будет сформирован срочный отчет по форме 4-ВЕТ-Б, согласно ПРИКАЗУ
            МИНСЕЛЬХОЗА РФ от 21.02.2022 № 89. <br />
            В соответствии со статьей 4.1 Закона РФ «О Ветеринарии» от
            14.05.1993 №4979-1, Постановлением правительства РФ от 07.11.2016
            №1140 «О порядке создания, развития и эксплуатации федеральной
            государственной информационной системы в области ветеринарии» и
            порядком предоставления информации в федеральную государственную
            информационную систему в области ветеринарии и получения информации
            из нее, утвержденного Приказом Минсельхоза России от 30.06.2017
            №318, испытательная лаборатория осуществляет работу с использованием
            компонента ФГИС «ВЕТИС»; <br />
            <br />В соответствии с Приказом Минэкономразвития РФ от 24.10.2020
            г. № 704 «Об утверждении положения о составе сведений о результатах
            деятельности аккредитованных лиц, об изменениях состава их
            работников и о компетенции этих работников, об изменениях
            технической оснащенности, представляемых аккредитованными лицами в
            Федеральную службу по аккредитации, порядке и сроках представления
            аккредитованными лицами таких сведений в Федеральную службу по
            аккредитации» сведения о выданных протоколах испытаний, в том числе
            о Заказчике, представляются в Федеральную службу по аккредитации;
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={5}>Представитель заказчика ознакомлен и согласен:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined text-center"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined">
          {companyDoctor}
        </Col>
      </Row>
      <Row className="text-center text-sm mb-2 ">
        <Col md={5}></Col>
        <Col md={2}>(должность)</Col>
        <Col></Col>
        <Col md={2}>(подпись)</Col>
        <Col></Col>
        <Col md={2}>(расшифровка подписи)</Col>
      </Row>
      <Row>
        <Col md={5}>Подпись лица, сдавшего пробы, дата:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined text-center">
          {doctor}
        </Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col md={5}></Col>
        <Col md={2}>(подпись)</Col>
        <Col></Col>
        <Col md={2}>(расшифровка подписи)</Col>
        <Col></Col>
        <Col md={2}>(дата)</Col>
      </Row>
      <Row>
        <Col md={5}>Сотрудник, принявший пробы:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm mb-3">
        <Col md={5}></Col>
        <Col md={2}>(подпись)</Col>
        <Col></Col>
        <Col md={2}>(расшифровка подписи)</Col>
        <Col></Col>
        <Col md={2}>(дата)</Col>
      </Row>
      <Row>
        <Col md={3}>Отметка лаборатории:</Col>
        <Col md={3}>Доставлено проб (кол-во):</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={3}>Забраковано проб (кол-во):</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="mb-4">
        <Col className="font-bold">Причина браковки проб: </Col>
      </Row>
      <Row className="mb-5">
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="mb-5">
        <Col md={2} className="font-bold">
          Примечание:
        </Col>
        <Col md={10} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="mb-5">
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col className="font-bold">Анализ заявки произведен и согласован:</Col>
      </Row>
      <Row>
        <Col md={3}>Представитель заказчика:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col md={3}></Col>
        <Col md={2}>(ФИО)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
      </Row>
      <Row>
        <Col md={5}>Представитель БГУ «Ивоблветлаборатория»:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm">
        <Col md={5}></Col>
        <Col md={2}>(должность)</Col>
        <Col></Col>
        <Col md={2}>(подпись)</Col>
        <Col></Col>
        <Col md={2}>(расшифровка подписи)</Col>
      </Row>
    </Container>
  );
}
