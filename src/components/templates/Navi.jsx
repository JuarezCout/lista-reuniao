import './Navi.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">

        <ul>
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/listas">
                <i className="fa fa-bars"></i> Criação de Lista
            </Link>
            <Link to="/listas-anteriores">
                <i className="fa fa-book"></i> Listas Anteriores
            </Link>
        </ul>
    </aside>