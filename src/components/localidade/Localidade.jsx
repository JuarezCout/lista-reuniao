import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import Servicos from '../localidade/servico/Servico'




function Localidade(props) {
    let inputListas = props.data[0]
    let inputLocalidade = props.data[1]
    let index_l = props.data[2]
    let values = props.data[0];

    useEffect(() => {

        let values = props.data[0];
    });


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
        let values = { inputListas };
        values[0].localidades.push({ nome: nome, servicos: [], diversos: [{ servicos_extras: [], obs: [] }] })
        props.setInputLista(values)
        document.getElementById("local").value = ''
    }

    function handleRemoveLocalidade(index_l) {
        let values = { inputListas };
        values[0].localidades.splice(index_l, 1);
        props.setInputLista(values)
    }

    function handleEditLocalidade(index_l) {

    }

    //Funções para botões do campo Serviço
    function handleAddServico(nome, index_l) {
        let values = { inputListas };
        values[0].localidades[index_l].servicos.push({ nome: nome, reunioes: [] })
        props.setInputLista(values)
    }

    function handleRemoveServico(index_l, index_s) {
        let values = { inputListas }
        values[0].localidades[index_l].servicos.splice(index_s, 1)
        props.setInputLista(values)
    }

    function handleEditServico(index_l, index_s) {

    }

    //Funções para botões do campo Diversos
    function handleAddObservacao(text_obs, index_l) {
        let values = { inputListas };
        values[0].localidades[index_l].diversos[0].obs.push({ text_obs: text_obs })
        props.setInputLista(values)
        document.getElementById(indexaId("text_obs", index_l, 0)).value = ''
    }

    function handleAddServicoExtra(nome, index_l) {
        let values = { inputListas };
        values[0].localidades[index_l].diversos[0].servicos_extras.push({ nome: nome, reunioes_extras: [] })
        props.setInputLista(values)
        document.getElementById("nome_reuniao").value = ''
    }

    function handleAddReuniaoExtra(data, dia, hora, local, index_l, index_se) {
        let values = { inputListas };
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.push({ data: data, dia: dia, hora: hora, local: local })
        props.setInputLista(values)
        document.getElementById(indexaId("data_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("dia_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("hora_reuniao_e", index_l, index_se)).value = ''
        document.getElementById(indexaId("local_reuniao_e", index_l, index_se)).value = ''
    }

    function handleRemoveObservacao(index_l, index_o) {
        let values = { inputListas }
        values[0].localidades[index_l].diversos[0].obs.splice(index_o, 1)
        props.setInputLista(values)
    }

    function handleRemoveServicoExtra(index_l, index_se) {
        let values = { inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras.splice(index_se, 1)
        props.setInputLista(values)

    }

    function handleRemoveReuniaoExtra(index_l, index_se, index_re) {
        let values = { inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.splice(index_re, 1)
        props.setInputLista(values)
    }

    function handleEditDiverso(index_l, index_s) {

    }


    //Funções para botões do campo Reunião 
    function handleAddReuniao(data, dia, hora, local, anciao, index_l, index_s) {
        let values = { inputListas };
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
        let values = { inputListas }
        values[0].localidades[index_l].servicos[index_s].reunioes.splice(index_r, 1)
        props.setInputLista(values)
    }

    function handleEditReuniao(index_l, index_s, index_r) {

    }

    function handleSubmit({ target }) {

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-8">
                        <div className="form-group" key={index_l}>
                            <h2>{inputLocalidade.nome}</h2>
                        </div>
                    </div>
                    <div className="col-4 col-sm-2">
                        <i className="fa fa-trash" onClick={() => handleRemoveLocalidade(index_l)}></i>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <div className="form-group">
                            <select className="form-select" name="servicos" id="servicos">
                                <option value="Batismo">Batismo</option>
                                <option value="Santa Ceia">Santa Ceia</option>
                                <option value="Reunião de Mocidade">Reunião de Mocidade</option>
                                <option value="Reunião de Jovens e Menores com os Pais">Reunião de Jovens e Menores com os Pais</option>
                                <option value="Ensaio Regional">Ensaio Regional</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <i className="fa fa-plus" onClick={() => handleAddServico(document.getElementById("servicos").value, index_l)}></i>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-8">
                        <div className="form-group">
                            <h3>Diversos</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <div className="form-group">
                            <h4>Reuniões Extras</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <input type="text" className="form-control" id="nome_reuniao" />
                    </div>
                    <div className="col-4">
                        <i className="fa fa-plus" onClick={() => handleAddServicoExtra(document.getElementById("nome_reuniao").value, index_l)}></i>
                    </div>
                </div>


            </form>

            <hr />


        </div>
    );


}

export default Localidade;
