import React, { MouseEventHandler } from "react";
import { Client } from "../../types";
import { Header } from "../header/header";
import { TextInput, Select, Button, Link, TableDataItem, TableActionConfig, ThemeProvider, Modal, SelectOption, SelectOptionGroup } from "@gravity-ui/uikit";
import { DateField } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { TableTickets } from "./table";

export const TicketsPanel = () => {
    const [change, setChange] = React.useState(false);
    const [clientsList, setClientsList] = React.useState<Client[]>([]);
    const [numberTicket, setNumberTicket] = React.useState('');
    const [nameOrg, setNameOrg] = React.useState('');
    const [nameClient, setNameClient] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [ATI, setATI] = React.useState('');
    const [status, setStatus] = React.useState(['Новая']);
    const [dateTicket, setDateTicket] = React.useState(dateTimeParse ('') || null);
    const [search, setSearch] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [itemID, setItemID] = React.useState(0);
    const [complete, setComplete] = React.useState(false);

    const createItem = (e: { preventDefault: () => void; }) => {
        const newClient = {
            id: Date.now(),
            numberTicket: numberTicket,
            dateTicket: dateTicket?.timeZone('Asia/Yekaterinburg').format('DD.MM.YYYY HH:m').toString() || '',
            nameOrg: nameOrg,
            nameClient: nameClient,
            telephone: telephone,
            comment: comment,
            status: status,
            ATI: <Link href={"https://ati.su/firms/" + ATI + "/info"}>{ATI}</Link>,
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
        setDateTicket(dateTimeParse ('') || null);
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
            ATI: <Link href={"https://ati.su/firms/" + ATI + "/info"}>{ATI}</Link>,
        }
        e.preventDefault();
        setOpenModal(false)
        setNumberTicket('');
        setNameOrg('');
        setNameClient('');
        setTelephone('');
        setComment('');
        setATI('');
        setStatus(['Новая']);
        setDateTicket(dateTimeParse ('') || null);
        setClientsList(clientsList.map((client) => itemID === client.id ? updatedItem : client));
    }

    const getRowActions = (): TableActionConfig<TableDataItem>[] => {
        return [
          {
            text: 'Удалить',
            handler: (item: TableDataItem) => {
              setClientsList(clientsList.filter((client) => client.id !== item.id));
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
              setATI(item.ATI.props.children.toString());
            },
            theme: 'danger',
          }
        ];
    };

    const selectOptions = [
        {value: 'Новая', content: 'Новая'},
        {value: 'В работе', content: 'В работе'},
        {value: 'Завершенна', content: 'Завершенна'},    
    ]

    const formClient = (cliclFunc: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, nameButton: string, options: (SelectOption<any> | SelectOptionGroup<any>)[], selectActive: boolean) => {
        return (
            <form action="" style={{display: "flex"}}>
                    <TextInput style={{width: '200px'}} value={numberTicket}  id="numberTicket" type="number" placeholder="Номер заявки" onChange={(e) => setNumberTicket(e.target.value)} />
                    <DateField style={{width: '200px'}} value={dateTicket} id="dateTicket" placeholder="Дата и время получения заявки от клиента" format='DD.MM.YYYY HH:m' timeZone="Asia/Yekaterinburg" onUpdate={(e) => setDateTicket(e)} />
                    <TextInput style={{width: '200px'}} value={nameOrg}  id="nameOrg" type="text" placeholder="Название фирмы клиента" onChange={(e) => setNameOrg(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={nameClient}  id="nameClient" type="text" placeholder="ФИО перевозчика" onChange={(e) => setNameClient(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={telephone}  id="telephone" type="tel" placeholder="Контактный телефон перевозчика" onChange={(e) => setTelephone(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={comment}  id="comment" type="text" placeholder="Комментарии" onChange={(e) => setComment(e.target.value)} />
                    <Select pin='brick-brick' label="Статус:" id="status" value={[status.toString()]} onUpdate={(e) => setStatus(e)} placeholder="Статус" 
                    options={options} disabled={selectActive} />
                    <TextInput style={{width: '200px'}} value={ATI} id="ATI" type="url" placeholder="ATI код сети перевозчика" onChange={(e) => setATI(e.target.value)}/>
                    <Button onClick={cliclFunc} type="submit" children={nameButton} />
            </form>
        )
    }

        
    function dataTable() {
        if (search !== '' && complete === true) {
            return clientsList.filter((client) => 
                client.numberTicket.toString().includes(search.toLowerCase())  || 
                client.nameOrg.toLowerCase().includes(search.toLowerCase()) || 
                client.nameClient.toLowerCase().includes(search.toLowerCase()) || 
                client.comment.toLowerCase().includes(search.toLowerCase()) || 
                client.ATI.props.children.toString().toLowerCase().includes(search.toLowerCase()) || 
                client.status.toString().toLowerCase().includes(search.toLowerCase()) ||
                client.telephone.toString().toLowerCase().includes(search.toLowerCase()) ||
                client.dateTicket.toString().toLowerCase().includes(search.toLowerCase())).filter((client) => client.status.toString() !== 'Завершенна')
            } if (search !== '' && complete === false) {
            return clientsList.filter((client) => 
                client.numberTicket.toString().includes(search.toLowerCase())  || 
                client.nameOrg.toLowerCase().includes(search.toLowerCase()) || 
                client.nameClient.toLowerCase().includes(search.toLowerCase()) || 
                client.comment.toLowerCase().includes(search.toLowerCase()) || 
                client.ATI.props.children.toString().toLowerCase().includes(search.toLowerCase()) || 
                client.status.toString().toLowerCase().includes(search.toLowerCase()) ||
                client.telephone.toString().toLowerCase().includes(search.toLowerCase()))
        } if (search === '' && complete === true) {
            return clientsList.filter((client) => client.status.toString() !== 'Завершенна')
        }
        return clientsList;
    }

    const TableUser = () => {
        return (
            <div>
                <TextInput id="search" type="text" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={() => setComplete(!complete)}>{!complete ? 'Показаны завершенные заявки' : 'Скрыты завершенные заявки'}</Button>
            </div>
        )
    }

    function ChangeButto(e: boolean) {
        if (e) {
          return (
            <div>
                {formClient(createItem, 'Добавить', selectOptions, true)}
                {TableUser()}
                {TableTickets(dataTable(), clientsList, getRowActions)}
            </div>
          )
        } return (
            <div>
                {TableUser()}
                {TableTickets(dataTable(), clientsList, undefined)}
            </div>
        )
    }
    
    return (
            <ThemeProvider theme="dark">
                <Button onClick={() => setChange(!change)}>{!change ? 'Активен режим пользователя' : 'Активен режим администратора'}</Button>
                {ChangeButto(change)}
                <Modal open={openModal} onClose={() => setOpenModal(false)} disableEscapeKeyDown disableOutsideClick>
                {formClient(updateItem, 'Сохранить', selectOptions.slice(-2), false)}
                </Modal>
            </ThemeProvider>
    );
}