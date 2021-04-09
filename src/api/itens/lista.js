const mongoose = require("mongoose"); //import mongoose

// LISTA schema
const ListaSchema = new mongoose.Schema({
  nome: String,
  data: String,
  localidades:
    [{
      id: Number,
      nome: String,
      servicos:
        [{
          id: Number,
          nome: String,
          reunioes:
            [{
              id: Number,
              data: String,
              dia: String,
              hora: String,
              local: String,
              anciao: String
            }]
        }],
      diversos:
        [{
          servicos_extras:
            [{
              id: Number,
              nome: String,
              reunioes_extras:
                [{
                  id: Number,
                  data: String,
                  dia: String,
                  hora: String,
                  local: String
                }],
              obs:
                [{
                  id: Number,
                  text_obs: String,
                  negrito: Boolean
                }]

            }],
          obs:
            [{
              id: Number,
              text_obs: String,
              negrito: Boolean
            }]
        }]
    }],
  id: Number
},{collection: 'lista_reuniao'});


const Lista = mongoose.model("Lista", ListaSchema, "db"); //convert to model named Lista
module.exports = Lista; //export for controller use