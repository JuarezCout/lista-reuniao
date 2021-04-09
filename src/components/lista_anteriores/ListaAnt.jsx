import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    icon: 'listas',
    title: 'Listas',
    subtitle: 'Listar, alterar e excluir Listas anteriores!'
}

const baseUrl = 'http://localhost:3001/listas'

const initialState = { 
    lista: { servico: '', data: '' },
    list: []   
}


export default class listaCrud extends Component {

    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    getUpdatedList(lista, add = true) {
        const list = this.state.list.filter(l => l.id !== lista.id)
        if(add) list.unshift(lista)
        return list
    }

    load(lista) {
        this.setState({ lista })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    remove(lista) {
        axios.delete(`${baseUrl}/${lista.id}`).then(resp => {
            const list = this.getUpdatedList(lista, false)
            this.setState({ list })
        })
    }

    renderRows() {
        return this.state.list.map(lista => {
            return (
                <tr key={lista.id}>
                    <td>{lista.id}</td>
                    <td>{lista.servico}</td>
                    <td>{lista.data}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(lista)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(lista)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        console.log(initialState)

        return (
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
}