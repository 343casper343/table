import { TableDataItem, TableActionConfig, withTableActions, withTableSorting, Table } from "@gravity-ui/uikit";
import React from "react";
import { Header } from "../header/header";
import { Client } from "../../types";

export const MyTable = withTableActions(withTableSorting(Table));

export const TableTickets = (data: Client[], count: Client[], edit: ((item: TableDataItem, index: number) => TableActionConfig<TableDataItem>[]) | undefined) => {

    const columns = [
        {width: 200, placeholder: 'Нет номера', id: "numberTicket", name: "Номер заявки", meta: {sort: true, filter: () => true}}, 
        {width: 200, placeholder: 'Нет даты', id: "dateTicket", name: "Дата и время получения заявки от клиента", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет названия', id: "nameOrg", name: 'Название фирмы заказчика', meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет ФИО', id: "nameClient", name: "ФИО перевозчика", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет телефона', id: "telephone", name: "Контактный телефон перевозчика", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет комментария', id: "comment", name: "Комментарии", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет статуса', id: "status", name: "Статус", meta: {sort: true}}, 
        {width: 200, placeholder: 'Нет ATI', id: "ATI", name: "ATI код сети перевозчика", meta: {sort: true}}];
    return (
        <div>
            <Header count={count.length} />
            <MyTable data={data} columns={columns} emptyMessage="Нет заявок" getRowActions={edit} />
        </div>
    )
}