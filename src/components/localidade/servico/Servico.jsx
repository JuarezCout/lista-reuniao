import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import ListaCrud from '../../lista/ListaCrud'



function Servicos(props) {


    let inputListas = props.data[0]
    let inputServico = props.data[1]
    let index_l = props.data[2]
    let index_s = props.data[3]

    //Funções para botões do campo Serviço
    //Funções para uso de dados aleatorios
    function setDate() {
        var n = new Date();
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        var d = n.getDate();
        var data = d + "/" + m + "/" + y

        return data
    }


    function indexaId(nomeId, id_l, id_s) {
        return nomeId + id_l.toString() + id_s.toString();
    }

    //Funções para botões do campo Localidade
    function handleAddLocalidade(nome) {
        let values = { ...inputListas };
        values[0].localidades.push({ nome: nome, servicos: [], diversos: [{ servicos_extras: [], obs: [] }] })
        props.setInputLista(values)
        document.getElementById("local").value = ''
    }

    function handleRemoveLocalidade(index_l) {
        let values = { ...inputListas };
        values[0].localidades.splice(index_l, 1);
        props.setInputLista(values)
    }

    function handleEditLocalidade(index_l) {

    }

    //Funções para botões do campo Serviço
    function handleAddServico(nome, index_l) {
        let values = { ...inputListas };
        values[0].localidades[index_l].servicos.push({ nome: nome, reunioes: [] })
        props.setInputLista(values)
    }

    function handleRemoveServico(index_l, index_s) {
        let values = { ...inputListas }
        values[0].localidades[index_l].servicos.splice(index_s, 1)
        props.setInputLista(values)
    }

    function handleEditServico(index_l, index_s) {

    }

    //Funções para botões do campo Diversos
    function handleAddObservacao(text_obs, index_l) {
        let values = { ...inputListas };
        values[0].localidades[index_l].diversos[0].obs.push({ text_obs: text_obs })
        props.setInputLista(values)
        document.getElementById(indexaId("text_obs", index_l, 0)).value = ''
    }

    function handleAddServicoExtra(nome, index_l) {
        let values = { ...inputListas };
        values[0].localidades[index_l].diversos[0].servicos_extras.push({ nome: nome, reunioes_extras: [] })
        props.setInputLista(values)
        document.getElementById("nome_reuniao").value = ''
    }

    function handleAddReuniaoExtra(data, dia, hora, local, index_l, index_se) {
        let values = { ...inputListas };
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.push({ data: data, dia: dia, hora: hora, local: local })
        props.setInputLista(values)
        document.getElementById(indexaId("data_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("dia_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("hora_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("local_reuniao_e", index_l, index_se)).value = ''
    }

    function handleRemoveObservacao(index_l, index_o) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].obs.splice(index_o, 1)
        props.setInputLista(values)
    }

    function handleRemoveServicoExtra(index_l, index_se) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras.splice(index_se, 1)
        props.setInputLista(values)

    }

    function handleRemoveReuniaoExtra(index_l, index_se, index_re) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.splice(index_re, 1)
        props.setInputLista(values)
    }

    function handleEditDiverso(index_l, index_s) {

    }


    //Funções para botões do campo Reunião 
    function handleAddReuniao(data, dia, hora, local, anciao, index_l, index_s) {
        let values = { ...inputListas };
        values[0].localidades[index_l].servicos[index_s].reunioes.push({
            data: data,
            dia: dia,
            hora: hora,
            local: local,
            anciao: anciao
        })
        props.setInputLista(values)
        document.getElementById(indexaId("data_reuniao", index_l, index_s)).value = ''
        document.getElementById(indexaId("dia_reuniao", index_l, index_s)).value = ''
        document.getElementById(indexaId("hora_reuniao", index_l, index_s)).value = ''
        document.getElementById(indexaId("local_reuniao", index_l, index_s)).value = ''
        document.getElementById(indexaId("anciao_reuniao", index_l, index_s)).value = ''
    }

    function handleRemoveReuniao(index_l, index_s, index_r) {
        let values = { ...inputListas }
        values[0].localidades[index_l].servicos[index_s].reunioes.splice(index_r, 1)
        props.setInputLista(values)
    }

    function handleEditReuniao(index_l, index_s, index_r) {

    }


    return (
        <div className="container">

            <hr />

            <div className="row">
                <div className="col-4">
                    <div className="form-group" key={index_s}>
                        <h3>{inputServico.nome}</h3>
                    </div>
                </div>
                <div className="col-4 col-sm-2">
                    <i className="fa fa-trash" onClick={() => handleRemoveServico(index_l, index_s)}></i>
                </div>
            </div>

            <div className="row">
                <div className="col-1">
                    <p>Data</p>
                </div>
                <div className="col-1">
                    <p>Dia</p>
                </div>
                <div className="col-2">
                    <p>Hora</p>
                </div>
                <div className="col-4">
                    <p>Localidade</p>
                </div>
                <div className="col-3">
                    <p>Ancião</p>
                </div>
            </div>

            <div className="row">
                <div className="col-1">
                    <input type="text" className="form-control" id={indexaId("data_reuniao", index_l, index_s)} />
                </div>
                <div className="col-1">
                    <input type="text" className="form-control" id={indexaId("dia_reuniao", index_l, index_s)} />
                </div>
                <div className="col-2">
                    <input type="text" className="form-control" id={indexaId("hora_reuniao", index_l, index_s)} />
                </div>
                <div className="col-4">
                    <input type="text" className="form-control" id={indexaId("local_reuniao", index_l, index_s)} />
                </div>
                <div className="col-3">
                    <input type="text" className="form-control" id={indexaId("anciao_reuniao", index_l, index_s)} />
                </div>
                <div className="col-1">
                    <i className="fa fa-plus" onClick={() => handleAddReuniao(document.getElementById(indexaId("data_reuniao", index_l, index_s)).value,
                        document.getElementById(indexaId("dia_reuniao", index_l, index_s)).value,
                        document.getElementById(indexaId("hora_reuniao", index_l, index_s)).value,
                        document.getElementById(indexaId("local_reuniao", index_l, index_s)).value,
                        document.getElementById(indexaId("anciao_reuniao", index_l, index_s)).value,
                        index_l, index_s)}></i>
                </div>
            </div>
        </div>
    )
}

export default Servicos