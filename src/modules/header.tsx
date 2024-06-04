import React from "react";

interface HeaderProps {
    count: number
}

export const Header: React.FC<HeaderProps> = ({count}) => {
    return (
        <header>
            <div>Количество заявок: {count}</div>
        </header>
    )};