import { professor } from "../models.js";

export const userProf = {

    create : async (nome, espec) => {

        const resultado = {
                criado : false,
                infos : []
            }

        if (nome && espec) {

            await professor.create({
                nome : nome.toUpperCase(),
                especializacao : espec.toUpperCase()
            }).then(user => {

                resultado.criado = true,
                resultado.infos = user

            }).catch(error => {
                console.log('ERRO AO CRIAR USER PROFESSOR ' + error)
            })

        }

        return resultado

    },

    readAll : async () => {
        
        const professores = await professor.findAll()

        return professores
    },

    readWhere : async (id, nome) => {

        let resultado = {}

        if (id, nome) {

            await professor.findAll({
                where : {
                    id : id,
                    nome : nome.toUpperCase()
                }
            }).then(user => {
                if (user.length > 0) {
                    resultado = user[0]
                }
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })

        }

        return resultado
        
    },

    readById : async (id) => {
        let resultado = {}

        if (id) {

            await professor.findAll({
                where : {
                    id : id,
                }
            }).then(user => {
                if (user.length > 0) {
                    resultado = user[0]
                }
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })

        }

        return resultado
    },

    update : async (id,campo,valor) => {
        const resultado = {
            estado : false,
            mensagem : ''
        }

        if (campo.toLowerCase() == "id") {
            resultado.mensagem = 'IMPOSSIVEL ALTERAR O ID DO USUARIO'
            return resultado
        }

        if (id && campo && valor) {
            await professor.update({ [campo.toLowerCase()] : valor.toUpperCase()}, {
                where : {id : id}
            }).then(numeroAlt => {
                if (numeroAlt > 0) {
                    resultado.estado = true
                    resultado.mensagem = `USUARIO DE ID ${id} FOI ALTERADO`
                } else {
                    resultado.mensagem = 'NENHUM USUARIO ALTERADO'
                }
            }).catch(error => {
                console.log('ERRO AO ALTERAR USUARIO PROFESSOR ' + error)
                resultado.mensagem = 'NENHUM USUARIO ALTERADO'
            })
        }

        return resultado
    },

    delete : async (id) => {
        const resultado = {
            estado : false,
            menssagem : ''
        }

        if (id) {
            await professor.destroy({
                where : {
                    id : id
                }
            }).then(numDelets => {
                if (numDelets > 0) {
                    resultado.estado = true
                    resultado.menssagem = 'USUARIO PROFESSOR DELETADO'
                } else {
                    resultado.menssagem = 'NENHUM USUARIO DELETADO NESTA CONSULTA'
                }
            }).catch(error => {
                console.log('ERRO AO DELETAR USUARIO PROFESSOR' + error)
                resultado.menssagem = 'ERRO AO DELETAR USUARIO'
            })
        }

        return resultado
    }

}