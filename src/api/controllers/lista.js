const Lista = require("../itens/lista")


//Funcoes para a Lista completa

//GET '/lista'
exports.getAllLista = (req, res, next) => {
    Lista.find({}, (err, lista) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(lista);
    });
};

//GET '/lista/:id'
exports.getOneLista = (req, res, next) => {
    let id = req.params.id; //get the lista name

    //find the specific lista with that name
    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Lista não existe." });
        }
        else return res.json({ data }); //return the lista object if found
    });
};


//POST '/lista'
exports.newLista = (req, res, next) => {

    Lista.findOne({id:req.params.id},(data)=>{

        if(data===null){
            const newLista = new Lista({
                nome:req.params.nome,
                data: req.params.data,
                localidades: req.params.localidades,
            })

            newLista.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })           
        }else{
            return res.json({message:"Lista already exists"});
        }
    })    
};


//DELETE '/lista/:id'
exports.deleteOneLista = (req, res, next) => {
    let id = req.params.id;

    Lista.deleteOne({ id: id }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Lista não existe." });
        }
        else return res.json({ message: "Lista " + id + " excluída" });
    });
};



//POST '/localidade/'
exports.newLocalidade = (req, res, next) => {
    let id = req.params.id;
    let localidade = req.params.localidade;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !localidade) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades.push(localidade);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/servico/'
exports.newServico = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let servico = req.params.servico;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !servico) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].servicos.push(servico);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/reuniao'
exports.newReuniao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].servicos[index_s].reunioes.push(reuniao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/servicoextra'
exports.newServicoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let servico = req.params.servico;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !servico) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras.push(servico);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/reuniaoextra'
exports.newReuniaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].reunioes_extras.push(reuniao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/observacao
exports.newObservacao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let observacao = req.params.observacao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !observacao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].obs.push(observacao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//POST '/observacaoextra'
exports.newobservacaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let obs = req.params.obs;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !obs) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].obs.push(obs);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//PUT '/reuniao/:id'
exports.updateReuniao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_r = req.params.index_r;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].servicos[index_s].reunioes.slice(index_r, 1, reuniao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//PUT '/reuniaoextra/:id'
exports.updateReuniaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_r = req.params.index_r;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].reunioes_extras.slice(index_r, 1, reuniao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//PUT '/observacao/:id'
exports.updateObservacao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_o = req.params.index_o;
    let observacao = req.params.observacao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !observacao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].obs.slice(index_o, 1, observacao);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//PUT '/observacaoextra/:id'
exports.updateObservacaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_o = req.params.index_o;
    let obs = req.params.obs;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !obs) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].obs.slice(index_o, 1, obs);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};



//DELETE '/localidade/:id'
exports.deleteLocalidade = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let localidade = req.params.localidade;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !localidade) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades.slice(index_l, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/servico/:id'
exports.deleteServico = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let servico = req.params.servico;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !servico) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].servicos.slice(index_s, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/reuniao/:id'
exports.deleteReuniao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_r = req.params.index_r;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].servicos[index_s].reunioes.slice(index_r, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/servicoextra/:id'
exports.deleteServicoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let servico = req.params.servico;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !servico) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras.slice(index_s, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/reuniaoextra/:id'
exports.deleteReuniaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_r = req.params.index_r;
    let reuniao = req.params.reuniao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !reuniao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].reunioes_extras.slice(index_r, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/observacao/:id'
exports.deleteObservacao = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_o = req.params.index_o;
    let observacao = req.params.observacao;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !observacao) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].obs.slice(index_o, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};

//DELETE '/observacaoextra/:id'
exports.deleteObservacaoExtra = (req, res, next) => {
    let id = req.params.id;
    let index_l = req.params.index_l;
    let index_s = req.params.index_s;
    let index_o = req.params.index_o;
    let obs = req.params.obs;

    Lista.findOne({ id: id }, (err, data) => {
        if (err || !data || !obs) {
            return res.json({ message: "Lista não existe." });
        }
        else {
            data.localidades[index_l].diversos[0].servicos_extras[index_s].obs.slice(index_o, 1);

            data.save(err => {
                if (err) {
                    return res.json({ message: "Erro ao adicionar dado.", error: err });
                }
                return res.json(data);
            })
        }
    })
};
