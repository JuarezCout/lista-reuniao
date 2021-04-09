import React, { Component, useState, useEffect } from 'react'
import './ListaCrud.css'
import axios from 'axios'
import Main from '../templates/Main'
import Localidade from '../localidade/Localidade'
import Servicos from '../localidade/servico/Servico'
import Reunioes from '../localidade/servico/reunioes/Reunioes'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';

require('../../api/config/server')


let headerProps = {
    icon: 'listas',
    title: 'Criação de Lista',
    subtitle: ''
}



export default ListaCrud;

function ListaCrud() {

    const [inputListasExtras, setInputListaExtras] = useState(
        []
    );

    const [inputListas, setInputLista] = useState(
        [{ nome: '', data: setDate(), localidades: [] }]
    );

    const [inputId, setInputId] = useState(0)

    const [inputDisabled, setInputDisabled] = useState(true)

    const baseUrl = 'http://localhost:3001/listas'

    const [inputChgLista, setInputChgLista] = useState(0)

    /* useEffect(() => {
        console.log(window.localStorage.getItem("lista"))
        if (JSON.parse(window.localStorage.getItem("lista")) !== null) {
            setInputLista([JSON.parse(window.localStorage.getItem("lista"))])
        }
    }, [inputChgLista]) */

    useEffect(async () => {
        await testAxios()

    }, []);

    useEffect(() => {
        let values = { ...inputListas };
        console.log(inputListas);

        
        console.log("EAE");

        console.log(window.localStorage.getItem("lista"));

        if(window.localStorage.getItem("voltar") === 1){
            values[0] = JSON.parse(window.localStorage.getItem("lista"));
            window.localStorage.setItem("voltar", 0);
        }


        if (values[0].localidades.length != 0) {
            window.localStorage.setItem("lista", JSON.stringify(values[0]))
            setInputDisabled(false)
            if (window.localStorage.getItem("id") !== null && window.localStorage.getItem("id") !== undefined) {
                setInputId(window.localStorage.getItem("id"))
            }
            /* var obj = values[0]
            const method = inputId ? 'put' : 'post'
            const url = inputId ? `${baseUrl}/${inputId}` : baseUrl
            console.log(url) */

            /* axios[method](url, obj)
                .catch(error => console.error('Error:', error))
                .then(response => changeId(response.data.id)) */
        } else {
            setInputChgLista(1)
        }

    }, [inputListas]);



    function testAxios() {
        const url = 'http://localhost:3001/listas'
        /* axios(url)
            .catch(error => console.error('Error:', error))
            .then(response => setInputListaExtras(response.data[response.data.length - 1])) */
    }

    //Funções para uso de dados aleatorios

    function changeId(id) {
        if (inputId !== id) {
            setInputId(id)
            window.localStorage.setItem("id", id)
        }
    }

    function getIdLclStorage() {
        setInputId(window.localStorage.getItem("id"))
    }

    function setDate() {
        var n = new Date();
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        if (m < 10) m = "0" + m
        var d = n.getDate();
        if (d < 10) d = "0" + d
        var data = d + "/" + m + "/" + y

        return data
    }


    function indexaId(nomeId, id_l, id_s) {
        return nomeId + id_l.toString() + id_s.toString();
    }

    function ifEnsaio(index_l, index_s) {
        let values = { ...inputListas };
        if (values[0].localidades[index_l].servicos[index_s].nome === "ENSAIO REGIONAL") {
            return "Encarregado/Ancião"
        } else {
            return "Ancião"
        }
    }

    function clearLclStrg() {
        window.localStorage.clear()
        window.history.back()
    }

    function saveLclStorage() {

        /*   let values = { ...inputListas };
          console.log("Save", values[0])
          window.localStorage.setItem("lista", JSON.stringify(values[0])) */
    }

    //Funcao para alterar nome de reuniao
    function handleAddNomeReuniao(nome) {
        let values = { ...inputListas };
        if (!nome) {
            alert("Preencher campo Nome de Reuniao")

        } else {

            let id = values[0].localidades.length
            headerProps.subtitle = nome
            values[0].nome = nome
            setInputLista(values)
            document.getElementById("nome").value = ''
        }
    }

    //Funções para botões do campo Localidade
    function handleAddLocalidade(nome) {
        let values = { ...inputListas };
        if (!nome) {
            alert("Preencher campo Localidade")

        } else {

            let id = values[0].localidades.length

            values[0].localidades.push({ id: id, nome: nome, servicos: [], diversos: [{ servicos_extras: [], obs: [] }] })
            setInputLista(values)
            document.getElementById("local").value = ''
        }
    }

    function handleRemoveLocalidade(index_l) {
        let values = { ...inputListas };
        values[0].localidades.splice(index_l, 1);
        setInputLista(values)
    }

    function handleEditLocalidade(index_l) {

    }

    //Funções para botões do campo Serviço
    function handleAddServico(nome, index_l) {

        let values = { ...inputListas };
        let id = values[0].localidades[index_l].servicos.length
        values[0].localidades[index_l].servicos.push({ id: id, nome: nome, reunioes: [] })
        setInputLista(values)
    }

    function handleRemoveServico(index_l, index_s) {
        let values = { ...inputListas }
        values[0].localidades[index_l].servicos.splice(index_s, 1)
        setInputLista(values)
    }

    function handleEditServico(index_l, index_s) {

    }

    //Funções para botões do campo Diversos
    function handleAddObservacao(text_obs, index_l, negrito) {
        if (!text_obs) {
            alert("Preencher campo Observacao")

        } else {
            let values = { ...inputListas };
            let id = values[0].localidades[index_l].diversos[0].obs.length
            values[0].localidades[index_l].diversos[0].obs.push({ id: id, text_obs: text_obs, negrito: negrito.checked })
            setInputLista(values)
            document.getElementById(indexaId("text_obs", index_l, 0)).value = ''
        }
    }

    function handleRemoveObservacao(index_l, index_o) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].obs.splice(index_o, 1)
        setInputLista(values)
    }

    function handleEditObservacao(index_l, index_o) {
        let values = { ...inputListas }
        let data = values[0].localidades[index_l].diversos[0].obs[index_o].text_obs

        document.getElementById(indexaId("text_obs", index_l, 0)).value = data

        values[0].localidades[index_l].diversos[0].obs.splice(index_o, 1)
        setInputLista(values)
    }

    function handleAddServicoExtra(nome, index_l) {
        if (!nome) {
            alert("Preencher campo Serviço Extra")

        } else {

            let values = { ...inputListas };
            let id = values[0].localidades[index_l].diversos[0].servicos_extras.length
            values[0].localidades[index_l].diversos[0].servicos_extras.push({ id: id, nome: nome, reunioes_extras: [], obs: [] })
            setInputLista(values)
            document.getElementById(indexaId("nome_reuniao", index_l, 0)).value = ''
        }
    }

    function handleAddReuniaoExtra(data, dia, hora, local, index_l, index_se) {
        if (!data || !dia || !hora || !local) {
            alert("Preencher campos para adição de Reunião")

        } else {
            let values = { ...inputListas };
            let id = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.length
            values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.push({ id: id, data: data, dia: dia, hora: hora, local: local })
            values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.sort(compareTime)
            values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.sort(compareDate)
            setInputLista(values)
            document.getElementById(indexaId("data_reuniao_e", index_l, index_se)).value = ''
            document.getElementById(indexaId("dia_reuniao_e", index_l, index_se)).value = ''
            document.getElementById(indexaId("hora_reuniao_e", index_l, index_se)).value = ''
            document.getElementById(indexaId("local_reuniao_e", index_l, index_se)).value = ''
        }
    }



    function handleRemoveServicoExtra(index_l, index_se) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras.splice(index_se, 1)
        setInputLista(values)

    }

    function handleRemoveReuniaoExtra(index_l, index_se, index_re) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.splice(index_re, 1)
        setInputLista(values)
    }

    function handleEditReuniaoExtra(index_l, index_se, index_re) {
        let values = { ...inputListas }
        console.log(values)
        console.log(index_se)
        console.log(index_re)
        let data = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras[index_re].data


        document.getElementById(indexaId("data_reuniao_e", index_l, index_se)).value = data
        document.getElementById(indexaId("dia_reuniao_e", index_l, index_se)).value = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras[index_re].dia
        document.getElementById(indexaId("hora_reuniao_e", index_l, index_se)).value = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras[index_re].hora
        document.getElementById(indexaId("local_reuniao_e", index_l, index_se)).value = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras[index_re].local

        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].reunioes_extras.splice(index_re, 1)
        setInputLista(values)
    }

    function handleAddObservacaoSE(text_obs, index_l, index_se, negrito) {
        if (!text_obs) {
            alert("Preencher campo Observacao de Serviço")

        } else {
            /* if (negrito.checked) {
                document.getElementById("obs_prev").style.fontWeight = "bolder"
            } */
            let values = { ...inputListas };
            let id = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].obs.length
            console.log(values[0].localidades[index_l].diversos[0].servicos_extras[index_se])
            values[0].localidades[index_l].diversos[0].servicos_extras[index_se].obs.push({ id: id, text_obs: text_obs, negrito: negrito.checked })
            console.log(values)
            setInputLista(values)
            document.getElementById(indexaId("text_obs_se", index_l, index_se)).value = ''
        }
    }

    function handleRemoveObservacaoSE(index_l, index_o, index_se) {
        let values = { ...inputListas }
        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].obs.splice(index_o, 1)
        setInputLista(values)
    }

    function handleEditObservacaoSE(index_l, index_o, index_se) {
        let values = { ...inputListas }
        let data = values[0].localidades[index_l].diversos[0].servicos_extras[index_se].obs[index_o].text_obs

        document.getElementById(indexaId("text_obs_se", index_l, index_se)).value = data

        values[0].localidades[index_l].diversos[0].servicos_extras[index_se].obs.splice(index_o, 1)
        setInputLista(values)
    }


    //Funções para botões do campo Reunião 
    function handleAddReuniao(data, dia, hora, local, anciao, index_l, index_s) {
        if (!data || !dia || !hora || !local || !anciao) {
            alert("Preencher campos para adição de Reunião")

        } else {
            let values = { ...inputListas };
            let id = values[0].localidades[index_l].servicos[index_s].reunioes.length
            values[0].localidades[index_l].servicos[index_s].reunioes.push({
                id: id,
                data: data,
                dia: dia,
                hora: hora,
                local: local,
                anciao: anciao
            })
            values[0].localidades[index_l].servicos[index_s].reunioes.sort(compareTime)
            values[0].localidades[index_l].servicos[index_s].reunioes.sort(compareDate)
            setInputLista(values)
            document.getElementById(indexaId("data_reuniao", index_l, index_s)).value = ''
            document.getElementById(indexaId("dia_reuniao", index_l, index_s)).value = ''
            document.getElementById(indexaId("hora_reuniao", index_l, index_s)).value = ''
            document.getElementById(indexaId("local_reuniao", index_l, index_s)).value = ''
            document.getElementById(indexaId("anciao_reuniao", index_l, index_s)).value = ''
        }
    }

    function handleRemoveReuniao(index_l, index_s, index_r) {
        let values = { ...inputListas }
        values[0].localidades[index_l].servicos[index_s].reunioes.splice(index_r, 1)
        setInputLista(values)
    }

    function compareDate(a, b) {

        let aData = new Date(a.data)
        let bData = new Date(b.data)

        return aData - bData;
    }

    function compareTime(a, b) {

        let aData = Number(a.hora.split(':')[0]) * 60 * 1000 + Number(a.hora.split(':')[1]) * 1000;
        let bData = Number(b.hora.split(':')[0]) * 60 * 1000 + Number(b.hora.split(':')[1]) * 1000;

        return aData - bData;
    }


    function handleEditReuniao(index_l, index_s, index_r) {
        let values = { ...inputListas }
        let data = values[0].localidades[index_l].servicos[index_s].reunioes[index_r].data


        document.getElementById(indexaId("data_reuniao", index_l, index_s)).value = data
        document.getElementById(indexaId("dia_reuniao", index_l, index_s)).value = values[0].localidades[index_l].servicos[index_s].reunioes[index_r].dia
        document.getElementById(indexaId("hora_reuniao", index_l, index_s)).value = values[0].localidades[index_l].servicos[index_s].reunioes[index_r].hora
        document.getElementById(indexaId("local_reuniao", index_l, index_s)).value = values[0].localidades[index_l].servicos[index_s].reunioes[index_r].local
        document.getElementById(indexaId("anciao_reuniao", index_l, index_s)).value = values[0].localidades[index_l].servicos[index_s].reunioes[index_r].anciao
        values[0].localidades[index_l].servicos[index_s].reunioes.splice(index_r, 1)
        setInputLista(values)
    }


    //Função para renderização do conteudo
    function renderForm() {
        var date = setDate()
        headerProps.title = "Reunião do dia: " + date

        return (
            <Container className="form">

                {/* 
                <Row>
                    <Col xs="12" className="form-group">
                        <h1 id="reuniao">Reunião do dia: {date}</h1>
                    </Col>
                </Row> */}

                <Row>
                    <Col xs="8" className="form-group">
                        <h2 htmlFor="nome">Nome da Reunião</h2>
                        <select className="form-control" id="nome">
                            <option value="Reunião Geral de Ensinamentos">Reunião Geral de Ensinamentos</option>
                            <option value="Reunião Regional do Ministério">Reunião Regional do Ministério</option>
                            <option value="Reunião Geral do Ministério Regional">Reunião Geral do Ministério Regional</option>
                        </select>
                    </Col>
                    <Col xs="4" className="form-group">
                        <br />
                        <button className="btn btn-success"
                            onClick={e => handleAddNomeReuniao(document.getElementById("nome").value)}>
                            Alterar
                        </button>
                    </Col>
                </Row>


                <hr />

                <Row>
                    <Col xs="8" className="form-group">
                        <h2 htmlFor="local">Localidade</h2>
                        <input type="text" className="form-control" id="local" />
                    </Col>
                    <Col xs="4" className="form-group">
                        <br />
                        <button className="btn btn-primary"
                            onClick={e => handleAddLocalidade(document.getElementById("local").value)}>
                            Adicionar
                        </button>
                    </Col>
                </Row>

                {inputListas[0].localidades && inputListas[0].localidades.map((inputLocalidade, index_l) => (

                    <div className="container" >
                        {/*     <Localidade data={[inputLocalidade, index_l] } setInputLista={setInputLista}>
                        {inputLocalidade.servicos && inputLocalidade.servicos.map((inputServico, index_s) => (
                            <Servicos data={[inputServico, index_l, index_s]} setInputLista={setInputLista}>
                                {inputServico.reunioes && inputServico.reunioes.map((inputReuniao, index_r) => (
                                    <Reunioes data= {[inputReuniao, index_l, index_s, index_r]} setInputLista={setInputLista}>
                                    </Reunioes>
                                ))}
                            </Servicos>
                        ))}
                    </Localidade> */}



                        <hr />

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
                                    <select className="form-control" name="servicos" id={indexaId("servicos", index_l, 0)}>
                                        <option value="BATISMO">Batismo</option>
                                        <option value="SANTA CEIA">Santa Ceia</option>
                                        <option value="REUNIÃO DE MOCIDADE">Reunião de Mocidade</option>
                                        <option value="REUNIÃO DE JOVENS E MENORES COM OS PAIS">Reunião de Jovens e Menores com os Pais</option>
                                        <option value="ENSAIO REGIONAL">Ensaio Regional</option>
                                        <option value="CULTO PARA JOVENS">Culto para Jovens</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <i className="fa fa-plus" onClick={() => handleAddServico(document.getElementById(indexaId("servicos", index_l, 0)).value, index_l)}></i>
                            </div>
                        </div>


                        {inputLocalidade.servicos && inputLocalidade.servicos.map((inputServico, index_s) => (
                            <div className="container">

                                <hr />

                                <div className="row" key={index_s}>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <h3>{inputServico.nome}</h3>
                                        </div>
                                    </div>
                                    <div className="col-2 col-sm-2">
                                        <i className="fa fa-trash" onClick={() => handleRemoveServico(index_l, index_s)}></i>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-2">
                                        <p>Data</p>
                                    </div>
                                    <div className="col-1">
                                        <p>Dia</p>
                                    </div>
                                    <div className="col-2">
                                        <p>Hora</p>
                                    </div>
                                    <div className="col-3">
                                        <p>Localidade</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{ifEnsaio(index_l, index_s)}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-2">
                                        <input type="date" className="form-control" id={indexaId("data_reuniao", index_l, index_s)} />
                                    </div>
                                    <div className="col-1">
                                        <select className="form-control" name="servicos" id={indexaId("dia_reuniao", index_l, index_s)}>
                                            <option value="seg">seg</option>
                                            <option value="ter">ter</option>
                                            <option value="qua">qua</option>
                                            <option value="qui">qui</option>
                                            <option value="sex">sex</option>
                                            <option value="sab">sab</option>
                                            <option value="dom">dom</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <input type="time" className="form-control" id={indexaId("hora_reuniao", index_l, index_s)} />
                                    </div>
                                    <div className="col-3">
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

                                {inputServico.reunioes && inputServico.reunioes.map((inputReuniao, index_r) => (
                                    <div className="container">
                                        <hr />
                                        <div className="row" key={index_r}>
                                            <div className="col-2">
                                                <label>{inputReuniao.data.charAt(8) + inputReuniao.data.charAt(9) + "/" + inputReuniao.data.charAt(5) + inputReuniao.data.charAt(6)}</label>
                                            </div>
                                            <div className="col-1">
                                                <label>{inputReuniao.dia}</label>
                                            </div>
                                            <div className="col-2">
                                                <label>{inputReuniao.hora}</label>
                                            </div>
                                            <div className="col-3">
                                                <label>{inputReuniao.local}</label>
                                            </div>
                                            <div className="col-3">
                                                <label>{inputReuniao.anciao}</label>
                                            </div>

                                            <div className="col-1">
                                                <i className="fa fa-pencil" onClick={() => handleEditReuniao(index_l, index_s, index_r)}></i>
                                                <i className="fa fa-trash" onClick={() => handleRemoveReuniao(index_l, index_s, index_r)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

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
                                <input type="text" className="form-control" id={indexaId("nome_reuniao", index_l, 0)} />
                            </div>
                            <div className="col-4">
                                <i className="fa fa-plus" onClick={() => handleAddServicoExtra(document.getElementById(indexaId("nome_reuniao", index_l, 0)).value, index_l)}></i>
                            </div>
                        </div>
                        {inputLocalidade.diversos[0].servicos_extras && inputLocalidade.diversos[0].servicos_extras.map((inputServicoExtra, index_se) => (

                            <div className="container">

                                <hr />

                                <div className="row">
                                    <div className="col-8">
                                        <div className="form-group" key={index_se}>
                                            <h3>{inputServicoExtra.nome}</h3>
                                        </div>
                                    </div>
                                    <div className="col-1 col-sm-2">
                                        <i className="fa fa-trash" onClick={() => handleRemoveServicoExtra(index_l, index_se)}></i>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-2">
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
                                </div>

                                <div className="row">
                                    <div className="col-2">
                                        <input type="date" className="form-control" id={indexaId("data_reuniao_e", index_l, index_se)} />
                                    </div>
                                    <div className="col-1">
                                        <select className="form-control" name="servicos" id={indexaId("dia_reuniao_e", index_l, index_se)}>
                                            <option value="seg">seg</option>
                                            <option value="ter">ter</option>
                                            <option value="qua">qua</option>
                                            <option value="qui">qui</option>
                                            <option value="sex">sex</option>
                                            <option value="sab">sab</option>
                                            <option value="dom">dom</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <input type="time" className="form-control" id={indexaId("hora_reuniao_e", index_l, index_se)} />
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" id={indexaId("local_reuniao_e", index_l, index_se)} />
                                    </div>
                                    <div className="col-1">
                                        <i className="fa fa-plus" onClick={() => handleAddReuniaoExtra(
                                            document.getElementById(indexaId("data_reuniao_e", index_l, index_se)).value,
                                            document.getElementById(indexaId("dia_reuniao_e", index_l, index_se)).value,
                                            document.getElementById(indexaId("hora_reuniao_e", index_l, index_se)).value,
                                            document.getElementById(indexaId("local_reuniao_e", index_l, index_se)).value,
                                            index_l, index_se)}></i>
                                    </div>
                                </div>

                                {inputServicoExtra.reunioes_extras && inputServicoExtra.reunioes_extras.map((inputReuniaoExtra, index_re) => (
                                    <div className="container">
                                        <div className="row" key={index_re}>
                                            <div className="col-2">
                                                <label>{inputReuniaoExtra.data.charAt(8) + inputReuniaoExtra.data.charAt(9) + "/" + inputReuniaoExtra.data.charAt(5) + inputReuniaoExtra.data.charAt(6)}</label>
                                            </div>
                                            <div className="col-1">
                                                <label>{inputReuniaoExtra.dia}</label>
                                            </div>
                                            <div className="col-2">
                                                <label>{inputReuniaoExtra.hora}</label>
                                            </div>
                                            <div className="col-4">
                                                <label>{inputReuniaoExtra.local}</label>
                                            </div>
                                            <div className="col-1">
                                                <i className="fa fa-pencil" onClick={() => handleEditReuniaoExtra(index_l, index_se, index_re)}></i>
                                                <i className="fa fa-trash" onClick={() => handleRemoveReuniaoExtra(index_l, index_se, index_re)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="row">
                                    <div className="col-8">
                                        <h5>Observações</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <input type="text" className="form-control" id={indexaId("text_obs_se", index_l, index_se)} />
                                    </div>
                                    <div className="col-1">
                                        <label for="negrito">  Negrito</label>
                                        <input type="checkbox" id={indexaId("negrito", index_l, index_se)} name="negrito" />
                                    </div>
                                    <div className="col-3">
                                        <i className="fa fa-plus" onClick={() => handleAddObservacaoSE(document.getElementById(indexaId("text_obs_se", index_l, index_se)).value, index_l, index_se, document.getElementById(indexaId("negrito", index_l, index_se)))}></i>
                                    </div>
                                </div>

                                {inputServicoExtra.obs && inputServicoExtra.obs.map((inputObservacao, index_o) => (
                                    <div className="container">
                                        <br />
                                        <div className="row">
                                            <div className="col-11" id={indexaId("text_obs_se", index_l, index_se)}>
                                                <p>{inputObservacao.text_obs}</p>
                                            </div>
                                            <div className="col-1">
                                                <i className="fa fa-pencil" onClick={() => handleEditObservacaoSE(index_l, index_o, index_se)}></i>
                                                <i className="fa fa-trash" onClick={() => handleRemoveObservacaoSE(index_l, index_o, index_se)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ))}

                        <hr />

                        <div className="row">
                            <div className="col-8">
                                <div className="form-group">
                                    <h4>Observações Gerais</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">                                
                                <textarea className="form-control" rows="5" id={indexaId("text_obs", index_l, 0)} />
                            </div>
                            <div className="col-1">
                                <label for="negrito">  Negrito</label>
                                <input type="checkbox" id="negrito" name="negrito" />
                            </div>
                            <div className="col-3">
                                <i className="fa fa-plus" onClick={() => handleAddObservacao(document.getElementById(indexaId("text_obs", index_l, 0)).value, index_l, document.getElementById("negrito"))}></i>
                            </div>
                        </div>

                        {inputLocalidade.diversos[0].obs && inputLocalidade.diversos[0].obs.map((inputObservacao, index_o) => (
                            <div className="container">
                                <br />
                                <div className="row">
                                    <div className="col-11" id="obs_prev">
                                        <p id="obs_prev">{inputObservacao.text_obs}</p>
                                    </div>
                                    <div className="col-1">
                                        <i className="fa fa-pencil" onClick={() => handleEditObservacao(index_l, index_o)}></i>
                                        <i className="fa fa-trash" onClick={() => handleRemoveObservacao(index_l, index_o)}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <br />
                <br />
                <br />
                <br />
                <br />


                <Row>
                    <div className="col-md-4 text-center">
                        <Link to="/listas/pdf">
                            <button class="btn btn-danger" id="btPdf" disabled={inputDisabled}>Gerar PDF</button>
                        </Link>
                    </div>
                    <div className="col-md-4 text-center">
                        <button type="button" class="btn btn-warning" onClick={clearLclStrg}>Voltar</button>
                    </div>
                    <div className="col-md-4 text-center">
                        <a href="/lista-pdf" class="btn btn-success">Salvar Lista</a>
                    </div>
                </Row>

            </Container >
        )
    }


    return (
        <Main {...headerProps}>
            {renderForm()}
        </Main>
    )

}
