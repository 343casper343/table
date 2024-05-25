export interface Client{
    id: number,
    numberTicket: string;// ● Номер заявки
    dateTicket: string;// ● Дата и время получения заявки от клиента
    nameOrg: string;// ● Название фирмы клиента
    nameClient: string;// ● ФИО перевозчика
    telephone: string;// ● Контактный телефон перевозчика
    comment: string;// ● Комментарии
    status: string[];// ● Статус заявки: новая, в работе, завершено. При создании новой заявки у неё
    // автоматически выставляется статус “новая”. При редактировании статус
    // можно поменять на “в работе” или на “завершено”.
    ATI: JSX.Element// ● ATI код сети перевозчика (кликабельно, переход на сайт). Ссылка такого
    // вида: https://ati.su/firms/{ati}/info (пример: https://ati.su/firms/12345/info)
}

export interface ClientList{
    clients: Client[]
}

export interface ChangeButtonProps {
    e: boolean;
  }