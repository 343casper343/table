import React from "react";
import { Client } from "../../types";
import { Header } from "../header/header";
import { Table, TextInput, Select, Button, Link, withTableActions, withTableSorting, TableDataItem, TableActionConfig, ThemeProvider, Modal } from "@gravity-ui/uikit";
import { DateField } from '@gravity-ui/date-components';
import {dateTimeParse} from '@gravity-ui/date-utils';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export const TicketsPanel = () => {
    const [change, setChange] = React.useState(false);
    const [clientsList, setclientsList] = React.useState<Client[]>([]);
    const [value, setValue] = React.useState('');
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');
    const [value6, setValue6] = React.useState(['Новая']);
    const [value7, setValue7] = React.useState(dateTimeParse('') || null);
    const [search, setSearch] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const [itemID, setItemID] = React.useState(0);
    const [numberTicket, setNumberTicket] = React.useState('');
    const [dateTicket, setDateTicket] = React.useState('');
    const [nameOrg, setNameOrg] = React.useState('');
    const [nameClient, setNameClient] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [status, setStatus] = React.useState(['']);
    const [ATI, setATI] = React.useState('');

    const MyTable = withTableActions(withTableSorting(Table));
    const createItem = (e: { preventDefault: () => void; }) => {
        const numberTicket = value;
        const dateTicket = value7?.timeZone('Asia/Yekaterinburg').format('DD.MM.YYYY HH:MM').toString() || '';
        const nameOrg = value1;
        const nameClient = value2;
        const telephone = value3;
        const comment = value4;
        const status = value6;
        const ATI = <Link href={"https://ati.su/firms/" + value5 + "/info"}>{value5}</Link>;
        const newClient = {
            id: Date.now(),
            numberTicket,
            dateTicket,
            nameOrg,
            nameClient,
            telephone,
            comment,
            status,
            ATI
        }
        e.preventDefault();
        setclientsList([...clientsList, newClient]);
        console.log();
        setValue('');
        setValue1('');
        setValue2('');
        setValue3('');
        setValue4('');
        setValue5('');
        setValue6(['Новая']);
        setValue7(null);
    }

function updateItem(item: TableDataItem, e: { preventDefault: () => void; }) {
    
    const updatedItem = {
        id: itemID,
        numberTicket,
        dateTicket,
        nameOrg,
        nameClient,
        telephone,
        comment,
        status,
        ATI: <Link href={"https://ati.su/firms/" + ATI + "/info"}>{ATI}</Link>,
    }
    e.preventDefault();
    setOpenModal(false)
    setclientsList(clientsList.map((client) => itemID === client.id ? updatedItem : client));
}

    const getRowActions = (item: TableDataItem): TableActionConfig<TableDataItem>[] => {
        return [
          {
            text: 'Удалить',
            handler: (item: TableDataItem) => {
              setclientsList(clientsList.filter((client) => client.id !== item.id));
            },
            theme: 'danger',
          },
          {
            text: 'Редактировать',
            handler: (item: TableDataItem) => {
              console.log(item);
              setOpenModal(true);
              setItemID(item.id);
              setNumberTicket(item.numberTicket);
              setDateTicket(item.dateTicket);
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


    const columns = [
        {width: 200, placeholder: 'Нет номера', id: "numberTicket", name: "Номер заявки", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет даты', id: "dateTicket", name: "Дата и время получения заявки от клиента", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет названия', id: "nameOrg", name: 'Название фирмы заказчика', meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет ФИО', id: "nameClient", name: "ФИО перевозчика", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет телефона', id: "telephone", name: "Контактный телефон перевозчика", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет комментария', id: "comment", name: "Комментарии", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет статуса', id: "status", name: "Статус", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет ATI', id: "ATI", name: "ATI код сети перевозчика", meta: {sort: true}}];

    function SearchTable() {
        if (search === '') {
            return clientsList;
        }
        return clientsList.filter((client) => 
            client.numberTicket.toString().includes(search.toLowerCase())  || 
            client.nameOrg.toLowerCase().includes(search.toLowerCase()) || 
            client.nameClient.toLowerCase().includes(search.toLowerCase()) || 
            client.comment.toLowerCase().includes(search.toLowerCase()) || 
            client.ATI.props.children.toString().toLowerCase().includes(search.toLowerCase()) || 
            client.status.toString().toLowerCase().includes(search.toLowerCase()) ||
            client.telephone.toString().toLowerCase().includes(search.toLowerCase()) ||
            client.dateTicket.toString().toLowerCase().includes(search.toLowerCase()));
    }
    function ChangeButto(e: boolean) {
        if (e) {
          return (
            <div>
                <form action="" style={{display: "flex"}}>
                    <TextInput style={{width: '200px'}} value={value}  id="numberTicket" type="number" placeholder="Номер заявки" onChange={(e) => setValue(e.target.value)} />
                    <DateField style={{width: '200px'}} value={value7} id="dateTicket" placeholder="Дата и время получения заявки от клиента" format='DD.MM.YYYY HH:MM' timeZone="Asia/Yekaterinburg" onUpdate={(e) => setValue7(e)} />
                    <TextInput style={{width: '200px'}} value={value1}  id="nameOrg" type="text" placeholder="Название фирмы клиента" onChange={(e) => setValue1(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={value2}  id="nameClient" type="text" placeholder="ФИО перевозчика" onChange={(e) => setValue2(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={value3}  id="telephone" type="tel" placeholder="Контактный телефон перевозчика" onChange={(e) => setValue3(e.target.value)} />
                    <TextInput style={{width: '200px'}} value={value4}  id="comment" type="text" placeholder="Комментарии" onChange={(e) => setValue4(e.target.value)} />
                    <Select pin='brick-brick' label="Статус:" id="status" value={[value6.toString()]} onUpdate={(e) => setValue6(e)} placeholder="Статус" 
                    options={[
                        {value: 'Новая', content: 'Новая'},
                        {value: 'В работе', content: 'В работе'},
                        {value: 'Выполнена', content: 'Выполнена'}]} disabled />
                    <TextInput style={{width: '200px'}} value={value5} id="ATI" type="url" placeholder="ATI код сети перевозчика" onChange={(e) => setValue5(e.target.value)}/>
                    <Button onClick={createItem} type="submit" children="Добавить" />
                </form>
                <Header count={clientsList.length} />
                <TextInput id="search" type="text" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
                <MyTable data={SearchTable()} columns={columns} emptyMessage="Нет заявок" getRowActions={getRowActions} />
            </div>
          )
        } return (
            <div>
                <Header count={clientsList.length} />
                <TextInput id="search" type="text" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
                <MyTable data={SearchTable()} columns={columns} emptyMessage="Нет заявок" />
            </div>
        )
      }
    return (
            <ThemeProvider theme="dark">
                <Button onClick={() => setChange(!change)}>{!change ? 'Админ' : 'Обычный'}</Button>
                {ChangeButto(change)}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <form style={{display: 'flex', flexDirection: 'column'}}>
                        <TextInput
                            value={numberTicket}
                            onChange={(e) => setNumberTicket(e.target.value)}
                            placeholder="Номер заявки"
                        />
                        <DateField
                            value={dateTimeParse(dateTicket)}
                            format='DD.MM.YYYY HH:MM' 
                            timeZone="Asia/Yekaterinburg"
                            onUpdate={(e) => setDateTicket(e?.toString() || '')}
                        />
                        <TextInput
                            value={nameOrg}
                            onChange={(e) => setNameOrg(e.target.value)}
                            placeholder="Название фирмы"
                        />
                        <TextInput
                            value={nameClient}
                            onChange={(e) => setNameClient(e.target.value)}
                            placeholder="ФИО" 
                        />
                        <TextInput
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            placeholder="Контактный телефон"
                        />
                        <TextInput
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Комментарии"
                        />
                        <Select
                            value={status}
                            onUpdate={(e) => setStatus(e)}
                            options={[
                                {value: 'В работе', content: 'В работе'},
                                {value: 'Выполнена', content: 'Выполнена'}]} 
                        />
                        <TextInput
                            value={ATI}
                            onChange={(e) => setATI(e.target.value)}
                            placeholder="ATI код сети"
                        />
                        <Button
                            onClick={() => updateItem({numberTicket, dateTicket, nameOrg, nameClient, telephone, comment, status, ATI}, {preventDefault: () => {}})}
                        >
                            Сохранить
                        </Button>
                    </form>
                </Modal>
            </ThemeProvider>
    );
}