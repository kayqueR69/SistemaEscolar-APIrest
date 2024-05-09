import { disciplina } from "../models.js";

export const disciplinas = {

    create : async (idTurma,nome,descricao) => {

        const resultado = {
            criada : false,
            infos : []
        }

        if (idTurma && nome && descricao) {
            await disciplina.create({
                idTurma : idTurma,
                nome : nome.toUpperCase(),
                descricao : descricao.toUpperCase()
            }).then(results => {
                resultado.criada = true
                resultado.infos = results
            }).catch(error => {
                console.log('ERRO AO CRIAR DISCIPLINA ' + error) 
            })
        }

        return resultado
    },

    readAll : async () => {
        const resultados = await disciplina.findAll()
        return resultados
    },

    readByTurma : async (idTurma) => {
        
        let resultados = []

        if (idTurma) {
            await disciplina.findAll({
                where : {idTurma : idTurma}
            }).then(results => {
                resultados = results
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })
        }

        return resultados

    },

    readWhere : async (id,nome) => {
        
        let resultados = []

        if (id, nome) {
            await disciplina.findAll({
                where : {
                    id : id,
                    nome : nome.toUpperCase()
                }
            }).then(results => {
                if (results > 0) {
                    resultados = results
                }
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })
        }

        return resultados

    },

    update : async (id,campo,valor) => {
        
        const resultado = {
            estado : false,
            mensagem : ''
        }

        if (campo.toLowerCase() == "id") {
            resultado.mensagem = 'IMPOSSIVEL ALTERAR O ID DA DISCIPLINA'
            return resultado
        }

        if (id && campo && valor) {
            await disciplina.update({ [campo.toLowerCase()] : valor.toUpperCase()}, {
                where : {id : id}
            }).then(numeroAlt => {
                if (numeroAlt > 0) {
                    resultado.estado = true
                    resultado.mensagem = `DISCIPLINA DE ID ${id} FOI ALTERADA`
                } else {
                    resultado.mensagem = 'NENHUMA DISCIPLINA ALTERADA'
                }
            }).catch(error => {
                console.log('ERRO AO ALTERAR DISCIPLINA' + error)
                resultado.mensagem = 'NENHUMA ISCIPLINA ALTERADA'
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
            await disciplina.destroy({
                where : {
                    id : id
                }
            }).then(numDelets => {
                if (numDelets > 0) {
                    resultado.deletado = true
                    resultado.menssagem = 'DISCIPLINA DELETADA'
                } else {
                    resultado.menssagem = 'NENHUMA DISCIPLINA DELETADA'
                }
            }).catch(error => {
                console.log('ERRO AO DELETAR DISCIPLINA' + error)
                resultado.menssagem = 'ERRO AO DELETAR DISCIPLINA'
            })
        }

        return resultado

    }

}