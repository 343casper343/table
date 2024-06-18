import React, { MouseEventHandler, useEffect } from "react";
import { Client } from "./types/types";
import { TextInput, Select, Button, Link, TableDataItem, TableActionConfig, ThemeProvider, Modal, SelectOption, SelectOptionGroup } from "@gravity-ui/uikit";
import { DateField } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { TableTickets } from "./modules/table";

function TicketsPanel() {
  const [change, setChange] = React.useState(false);
  const [clientsList, setClientsList] = React.useState<Client[]>(getLS());
  const [numberTicket, setNumberTicket] = React.useState('');
  const [nameOrg, setNameOrg] = React.useState('');
  const [nameClient, setNameClient] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [ATI, setATI] = React.useState('');
  const [status, setStatus] = React.useState(['Новая']);
  const [dateTicket, setDateTicket] = React.useState(dateTimeParse('') || null);
  const [search, setSearch] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [itemID, setItemID] = React.useState(0);
  const [complete, setComplete] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [validNumber, setValidNubmer] = React.useState<"invalid" | undefined>(undefined);
  const [validDate, setValidDate] = React.useState<"invalid" | undefined>(undefined);
  const [validNameOrg, setValidNameOrg] = React.useState<"invalid" | undefined>(undefined);
  const [validNameClient, setValidNameClient] = React.useState<"invalid" | undefined>(undefined);
  const [validTelephone, setValidTelephone] = React.useState<"invalid" | undefined>(undefined);
  const [validComment, setValidComment] = React.useState<"invalid" | undefined>(undefined);
  const [validATI, setValidATI] = React.useState<"invalid" | undefined>(undefined);

function getLS() {
  const clientsListString = localStorage.getItem('clientsList');
  if (clientsListString !== null) {
    const clientsList = JSON.parse(clientsListString);
    return clientsList.map((client: Client) => {
      return {
        id: client.id,
        numberTicket: client.numberTicket,
        dateTicket: client.dateTicket,
        nameOrg: client.nameOrg,
        nameClient: client.nameClient,
        telephone: client.telephone,
        comment: client.comment,
        status: client.status,
        ATI: ATItrans(client.ATI.toString()),
      };
    });
  }
  return [];
}

  function ATItrans(ATI: string) {
    return <Link href={"https://ati.su/firms/" + ATI + "/info"}>{ATI}</Link>;
  }

  function ATIString(el: JSX.Element): string {
    return el.props.children.toString();
  }

  function validation(Client: Client) {
    if (Client.numberTicket === '' && Client.dateTicket === '' && Client.nameOrg === '' && Client.nameClient === '' && Client.telephone === '' && Client.comment === '' && ATIString(Client.ATI) === '') {
      if (Client.numberTicket === '') {
        setValidNubmer("invalid")
      } if (Client.dateTicket === '') {
        setValidDate("invalid")
      } if (Client.nameOrg === '') {
        setValidNameOrg("invalid")
      } if (Client.nameClient === '') {
        setValidNameClient("invalid")
      } if (Client.telephone === '') {
        setValidTelephone("invalid")
      } if (Client.comment === '') {
        setValidComment("invalid")
      } if (ATIString(Client.ATI) === '') {
        setValidATI("invalid")
      }
    }
  }

  const createItem = (e: { preventDefault: () => void; }) => {
    const newClient = {
      id: Date.now(),
      numberTicket,
      dateTicket: dateTicket?.timeZone('Asia/Yekaterinburg').format('DD.MM.YYYY HH:m').toString() || '',
      nameOrg,
      nameClient,
      telephone,
      comment,
      status,
      ATI: ATItrans(ATI),
    }
    if (numberTicket === '' || dateTicket === null || nameOrg === '' || nameClient === '' || telephone === '' || comment === '' || ATI === '') {
      e.preventDefault();
      validation(newClient)
      return
    }
    e.preventDefault();
    setClientsList([...clientsList, newClient]);
    setNumberTicket('');
    setNameOrg('');
    setNameClient('');
    setTelephone('');
    setComment('');
    setATI('');
    setStatus(['Новая']);
    setDateTicket(null);
  }

  const updateItem = (e: { preventDefault: () => void; }) => {
    const updatedItem = {
      id: itemID,
      numberTicket,
      dateTicket: dateTicket?.timeZone('Asia/Yekaterinburg').format('DD.MM.YYYY HH:m').toString() || '',
      nameOrg,
      nameClient,
      telephone,
      comment,
      status,
      ATI: ATItrans(ATI),
    }
    if (numberTicket === '' || dateTicket === null || nameOrg === '' || nameClient === '' || telephone === '' || comment === '' || ATI === '') {
      e.preventDefault();
      validation(updatedItem)
      return
    }
    e.preventDefault();
    setClientsList(clientsList.map((client) => itemID === client.id ? updatedItem : client));
    setOpenModal(false)
    setNumberTicket('');
    setNameOrg('');
    setNameClient('');
    setTelephone('');
    setComment('');
    setATI('');
    setStatus(['Новая']);
    setDateTicket(dateTimeParse('') || null);

  }

  const deleteItem = () => {
    return (
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div style={{textAlign: 'center', padding: '10px'}}>Вы действительно хотите удалить?</div>
        <div style={{textAlign: 'center', padding: '10px', display: 'flex', justifyContent: 'space-between'}}>
          <Button style={{textAlign: 'center'}} onClick={() => setDeleteModal(false)}>Нет</Button>
          <Button style={{textAlign: 'center'}} onClick={() => confirmDeleteItem()}>Да</Button>
        </div>
      </Modal>
    )
  }

  const confirmDeleteItem = () => {
    setClientsList(clientsList.filter((client) => client.id !== itemID));
    setDeleteModal(false);
  }

  const getRowActions = (): TableActionConfig<TableDataItem>[] => {
    return [
      {
        text: 'Удалить',
        handler: (item: TableDataItem) => {
          setDeleteModal(true);
          setItemID(item.id);
        },
        theme: 'danger',
      },
      {
        text: 'Редактировать',
        handler: (item: TableDataItem) => {
          setOpenModal(true);
          setItemID(item.id);
          setNumberTicket(item.numberTicket);
          setDateTicket(dateTimeParse(item.dateTicket || '') || null);
          setNameOrg(item.nameOrg);
          setNameClient(item.nameClient);
          setTelephone(item.telephone);
          setComment(item.comment);
          setStatus(item.status);
          setATI(ATIString(item.ATI));
        },
        theme: 'danger',
      }
    ];
  };

  const selectOptions = [
    { value: 'Новая', content: 'Новая' },
    { value: 'В работе', content: 'В работе' },
    { value: 'Завершенна', content: 'Завершенна' },
  ]

  const formClient = (formFunc: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, nameButton: string, options: (SelectOption<any> | SelectOptionGroup<any>)[], selectActive: boolean) => {
    return (
      <form action="" style={{ display: "flex", marginBottom: "30px" }}>
        <TextInput errorPlacement="inside" validationState={validNumber} errorMessage={'Укажите номер заявки'} style={{ width: '200px' }} value={numberTicket} id="numberTicket" type="number" placeholder="Номер заявки" onKeyDown={() => setValidNubmer(undefined)} onChange={(e) => setNumberTicket(e.target.value)} />
        <DateField errorPlacement="inside" validationState={validDate} errorMessage={'Укажите дату и время'} style={{ width: '200px' }} value={dateTicket} id="dateTicket" placeholder="Дата и время получения заявки от клиента" onKeyDown={() => setValidDate(undefined)} format='DD.MM.YYYY HH:m' timeZone="Asia/Yekaterinburg" onUpdate={(e) => setDateTicket(e)} />
        <TextInput errorPlacement="inside" validationState={validNameOrg} errorMessage={'Укажите фирму клиента'} style={{ width: '200px' }} value={nameOrg} id="nameOrg" type="text" placeholder="Название фирмы клиента" onKeyDown={() => setValidNameOrg(undefined)} onChange={(e) => setNameOrg(e.target.value)} />
        <TextInput errorPlacement="inside" validationState={validNameClient} errorMessage={'Укажите ФИО'} style={{ width: '200px' }} value={nameClient} id="nameClient" type="text" placeholder="ФИО перевозчика" onKeyDown={() => setValidNameClient(undefined)} onChange={(e) => setNameClient(e.target.value)} />
        <TextInput errorPlacement="inside" validationState={validTelephone} errorMessage={'Укажите телефон (10 цифр)'} style={{ width: '200px' }} value={telephone} id="telephone" type="tel" placeholder="Контактный телефон перевозчика" onKeyDown={() => setValidTelephone(undefined)} onChange={(e) => setTelephone(e.target.value)} />
        <TextInput errorPlacement="inside" validationState={validComment} errorMessage={'Укажите комментарии'} style={{ width: '200px' }} value={comment} id="comment" type="text" placeholder="Комментарии" onKeyDown={() => setValidComment(undefined)} onChange={(e) => setComment(e.target.value)} />
        <Select errorPlacement="inside" pin='brick-brick' label="Статус:" id="status" value={[status.toString()]} onUpdate={(e) => setStatus(e)} placeholder="Статус" options={options} disabled={selectActive} />
        <TextInput errorPlacement="inside" validationState={validATI} errorMessage={'Укажите ATI код'} style={{ width: '200px' }} value={ATI} id="ATI" type="url" placeholder="ATI код сети перевозчика" onKeyDown={() => setValidATI(undefined)} onChange={(e) => setATI(e.target.value)} />
        <Button onClick={formFunc} children={nameButton} type='submit' />
      </form>
    )
  }

  function dataTable() {
    if (search !== '' && complete === true) {
      return clientsList.filter((client) =>
        client.numberTicket.toString().includes(search.toLowerCase()) ||
        client.nameOrg.toLowerCase().includes(search.toLowerCase()) ||
        client.nameClient.toLowerCase().includes(search.toLowerCase()) ||
        client.comment.toLowerCase().includes(search.toLowerCase()) ||
        ATIString(client.ATI).toLowerCase().includes(search.toLowerCase()) ||
        client.status.toString().toLowerCase().includes(search.toLowerCase()) ||
        client.telephone.toString().toLowerCase().includes(search.toLowerCase()) ||
        client.dateTicket.toString().toLowerCase().includes(search.toLowerCase())).filter((client) => client.status.toString() !== 'Завершенна')
    } if (search !== '' && complete === false) {
      return clientsList.filter((client) =>
        client.numberTicket.toString().includes(search.toLowerCase()) ||
        client.nameOrg.toLowerCase().includes(search.toLowerCase()) ||
        client.nameClient.toLowerCase().includes(search.toLowerCase()) ||
        client.comment.toLowerCase().includes(search.toLowerCase()) ||
        ATIString(client.ATI).toString().toLowerCase().includes(search.toLowerCase()) ||
        client.status.toString().toLowerCase().includes(search.toLowerCase()) ||
        client.telephone.toString().toLowerCase().includes(search.toLowerCase()))
    } if (search === '' && complete === true) {
      return clientsList.filter((client) => client.status.toString() !== 'Завершенна')
    } return clientsList;
  }

  const SearchHideTickets = () => {
    return (
      <div>
        <TextInput id="search" type="text" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={() => setComplete(!complete)} children={!complete ? 'Показаны завершенные заявки' : 'Скрыты завершенные заявки'} type='button' />
      </div>
    )
  }

  function ChangeButto(e: boolean) {
    if (e) {
      if (openModal) {
        return (
          <div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} disableEscapeKeyDown>
              {formClient(updateItem, 'Сохранить', selectOptions.slice(-2), false)}
            </Modal>
            {SearchHideTickets()}
            {TableTickets(dataTable(), clientsList, getRowActions)}
          </div>
        )
      } return (
        <div>
          {formClient(createItem, 'Добавить', selectOptions, true)}
          {SearchHideTickets()}
          {TableTickets(dataTable(), clientsList, getRowActions)}
        </div>
      )
    } return (
      <div>
        {SearchHideTickets()}
        {TableTickets(dataTable(), clientsList, undefined)}
      </div>
    )
  }

  useEffect(() => {
    const data = clientsList.map((client) => {
      return {
        id: client.id,
        numberTicket: client.numberTicket,
        dateTicket: client.dateTicket,
        nameOrg: client.nameOrg,
        nameClient: client.nameClient,
        telephone: client.telephone,
        comment: client.comment,
        status: client.status,
        ATI: ATIString(client.ATI),
      }
    })
    if (data) {
      localStorage.setItem('clientsList', JSON.stringify(data))
    }
    }, [clientsList]);
  return (
    <ThemeProvider theme="dark">
      <Button onClick={() => setChange(!change)} children={!change ? 'Активен режим пользователя' : 'Активен режим администратора'} type='button' />
      {ChangeButto(change)}
      {deleteItem()}
    </ThemeProvider>
  );
}

export default TicketsPanel;