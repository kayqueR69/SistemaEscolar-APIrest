import { notas } from "../models.js";

export const nota = {

    create : async (idAluno,idDisciplina) => {
        
        const resultado = {
            criada : false,
            infos : []
        }

        if (idAluno && idDisciplina) {
            await notas.create({
                idAluno : idAluno,
                idDisciplina : idDisciplina,
                nota1 : 0,
                nota2 : 0
            }).then(results => {
                resultado.criada = true
                resultado.infos = results
            }).catch(error => {
                console.log('ERRO AO CRIAR NOTA ' + error)
            })
        }

        return resultado
    },

    readAll : async () => {
        const resultado = await notas.findAll()
        return resultado
    },

    readWhere : async (idAluno,idDisciplina) => {
        let resultados = []

        
        if (idAluno, idDisciplina) {
            await notas.findAll({
                where : {
                    idAluno : idAluno,
                    idDisciplina : idDisciplina
                }
            }).then(results => {
                resultados = results[0]
            }).catch(error => {
                console.log('ERRO NA CONSULTA ' + error)
            })
        }

        return resultados
    },

    updateValor : async (idAluno,idDisciplina,numNota, valor) => {
        
        const resultado = {
            estado : false,
            mensagem : ''
        }

        let campo = `nota${numNota}`

        if (idAluno && idDisciplina) {
            await notas.update({[campo] : valor},{
                where : {
                    idAluno : idAluno,
                    idDisciplina : idDisciplina
                }
            }).then(numeroAlt => {
                if (numeroAlt > 0) {
                    resultado.estado = true
                    resultado.mensagem = `NOTA${numNota} DO ALUNO ${idAluno} FOI ALTERADA VALOR ${valor}`
                } else {
                    resultado.mensagem = 'NENHUMA NOTA ALTERADA'
                }
            }).catch(error => {
                console.log('ERRO AO ALTERAR DISCIPLINA' + error)
                resultado.mensagem = 'NENHUMA NOTA ALTERADA'
            })
        }

        return resultado

    }

}