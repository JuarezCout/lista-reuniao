import express from 'express'
const router = express.Router();
const listaController = require('../controllers/lista');


module.exports = function (app) {
    app
        .get('/listas', listaController.getAllLista)
        .post('/listas', listaController.newLista)

    app
        .get('/listas/:id', listaController.getOneLista)
        .delete('/listas/:id', listaController.deleteOneLista);

    app
        .post('/localidade/:id', listaController.newLocalidade)
        .delete('/localidade/:id', listaController.deleteLocalidade);

    app
        .post('/servico/:id', listaController.newServico)
        .delete('/servico/:id', listaController.deleteServico);

    app
        .post('/reuniao/:id', listaController.newReuniao)
        .put('/reuniao/:id', listaController.updateReuniao)
        .delete('/reuniao/:id', listaController.deleteReuniao);


    app
        .post('/servicoextra/:id', listaController.newServicoExtra)
        .delete('/servicoextra/:id', listaController.deleteServicoExtra);


    app
        .post('/reuniaoextra/:id', listaController.newReuniaoExtra)
        .put('/reuniaoextra/:id', listaController.updateReuniaoExtra)
        .delete('/reuniaoextra/:id', listaController.deleteReuniaoExtra);

    app
        .post('/observacao/:id', listaController.newObservacao)
        .put('/observacao/:id', listaController.updateObservacao)
        .delete('/observacao/:id', listaController.deleteObservacao);

    app
        .post('/observacaoextra/:id', listaController.newobservacaoExtra)
        .put('/observacaoextra/:id', listaController.newobservacaoExtra)
        .delete('/observacaoextra/:id', listaController.deleteObservacaoExtra);

}  