import { turma } from "../models.js";

export const turmas = {

    create : async (idProf) => {

        let turmaCriada = {
            status : false,
            infos : {}
        }

        if (idProf) {
            await turma.create({
                idProfessor : idProf
            }).then(infos => {
                turmaCriada.status = true
                turmaCriada.infos = infos
            }).catch(error => {
                console.log('ERRO AO CRIAR TURMA')
            })
        }

        return turmaCriada
    },

    readAll : async () => {
        const resultados = await turma.findAll()

        return resultados
    },

    readById : async (id) => {
        const resultados = {
            existe : false,
            infos : []
        }

        if (id) {
            await turma.findAll({
                where : {
                    id : id
                }
            }).then( results => {
                if (results.length > 0) {
                    resultados.existe = true
                    resultados.infos = results
                }
            }).catch(erro => {
                console.log('ERRO NA CONSULTA ' + erro)
            })

        }

        return resultados
    },

    update : async (id,idProf,novoIdProf) => {
        const infos = {
            status : false,
            menssagem : ''
        }

        if (id && idProf) {
            await turma.update({idProfessor : novoIdProf},{
                where : {
                    id : id,
                    idProfessor : idProf
                }
            }).then(numAlt => {
                if (numAlt > 0) {
                    infos.status = true
                    infos.menssagem = `TURMA DE ID ${id} FOI ALTERADA COM SUCESSO`
                } else {
                    infos.menssagem = 'NENHUMA TURMA ALTERADA'
                }
            }).catch(erro => {
                console.log('ERRO AO ALTERAR TURMA ' + erro)
                infos.menssagem = 'ERRO AO ALTERAR TURMA'
            })
        }

        return infos
    },

    delete : async (id) => {
        const resultados = {
            deletada : false,
            menssagem : ''
        }

        if (id) {
            await turma.destroy({
                where : {
                    id : id
                }
            }).then(numDels => {
                if (numDels > 0) {
                    resultados.deletada = true
                    resultados.menssagem = `TURMA DE ID ${id} FOI DELETADA`
                } else {
                    resultados.menssagem = 'NENHUMA TURMA DELETADA'
                }
            }).catch(erro => {
                console.log('ERRO AO DELETAR TURMA' + erro) 
                resultados.menssagem = 'ERRO AO DELETAR TURMA'
            })
        } 
        return resultados
    }

}