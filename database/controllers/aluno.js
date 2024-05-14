import { aluno } from "../models.js";

export const userAluno = {

    create : async (nome, idTurma) => {

        const resultado = {
                criado : false,
                infos : []
            }

        if (nome) {

            await aluno.create({
                nome : nome.toUpperCase(),
                idTurma : idTurma
            }, {omitNull : false}).then(user => {

                resultado.criado = true,
                resultado.infos = user

            }).catch(error => {
                console.log('ERRO AO CRIAR USER ALUNO ' + error)
            })

        }

        return resultado

    },

    readAll : async () => {
        
        const alunos = await aluno.findAll()

        return alunos
    },

    readById : async (id) => {
        const resultados = {
            infos : []
        }

        if (id) {
            await aluno.findAll({
                where : {
                    id : id
                }
            }).then( results => {
                if (results.length > 0) {
                    resultados.infos = results
                }
            }).catch(erro => {
                console.log('ERRO NA CONSULTA ' + erro)
            })

        }

        return resultados
    },

    readByTurma : async (idTurma) => {
        const resultados = {
            qtdAlunos : 0,
            alunos : []
        }

        if (idTurma) {
            await aluno.findAll({
                where : {idTurma : idTurma}
            }).then(results => {
                resultados.alunos = results
                resultados.qtdAlunos = results.length
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })
        }

        return resultados
    },

    readWhere : async (id, nome) => {

        let resultado = {}

        if (id, nome) {

            await aluno.findAll({
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

    update : async (id,campo,valor) => {
        const resultado = {
            estado : false,
            mensagem : ''
        }

        if (campo == "id") {
            resultado.mensagem = 'IMPOSSIVEL ALTERAR O ID DO USUARIO'
            return resultado
            
        } else if (campo == 'nome') {
            valor = valor.toUpperCase()
        }

        if (id && campo && valor) {
            await aluno.update({ [campo] : valor}, {
                where : {id : id}
            }).then(numeroAlt => {
                if (numeroAlt > 0) {
                    resultado.estado = true
                    resultado.mensagem = `USUARIO DE ID ${id} FOI ALTERADO`
                } else {
                    resultado.mensagem = 'NENHUM USUARIO ALTERADO'
                }
            }).catch(error => {
                console.log('ERRO AO ALTERAR USUARIO ALUNO')
                resultado.mensagem = 'NENHUM USUARIO ALTERADO'
            })
        }

        return resultado
    },

    delete : async (id) => {
        const resultado = {
            deletado : false,
            menssagem : ''
        }

        if (id) {
            await aluno.destroy({
                where : {
                    id : id
                }
            }).then(numDelets => {
                if (numDelets > 0) {
                    resultado.deletado = true
                    resultado.menssagem = 'USUARIO ALUNO DELETADO'
                } else {
                    resultado.menssagem = 'NENHUM USUARIO DELETADO NESTA CONSULTA'
                }
            }).catch(error => {
                console.log('ERRO AO DELETAR USUARIO ALUNO' + error)
                resultado.menssagem = 'ERRO AO DELETAR USUARIO'
            })
        }

        return resultado
    }

}