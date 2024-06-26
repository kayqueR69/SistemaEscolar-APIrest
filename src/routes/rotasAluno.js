import { userAluno } from "../../database/controllers/aluno.js";
import { disciplinas } from "../../database/controllers/disciplina.js";
import { turmas } from "../../database/controllers/turma.js";
import { nota } from "../../database/controllers/notas.js";

export const rotasAluno = {
    cadastro : async (req,res) => {

        const nome = req.body.nome

        const dados = await userAluno.create(nome,null)

        if (dados.criado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    }, 

    login : async (req,res) => {
        const {id, nome} = req.body

        const dados = await userAluno.readWhere(id,nome)

        if (dados.id) {
            res.status(200).json({log : true, infos : dados})
        } else {
            res.status(400).json({log : false, infos : dados})
        }
    },

    alterarNome : async (req,res) => {
        const {id,nome} = req.body

        const dados = await userAluno.update(id,'nome',nome)

        if (dados.estado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    deleteUser : async (req,res) => {
        const id = req.params.id

        const dados = await userAluno.delete(id)

        if (dados.deletado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    verTurmas : async (req,res) => {
        const classes = await turmas.readAll()
        const results = []

        for (let c = 1; c < classes.length + 1; c++) {
            results.push({turma : classes[c-1], materias : await disciplinas.readByTurma(c)})
        }

        res.status(200).json(results)
    },

    vincularTurma : async (req,res) => {

        const {id,idTurma} = req.body

        const dados = await userAluno.update(id,'idTurma',idTurma)

        const listaDisciplinas = await disciplinas.readByTurma(idTurma)

        for (let c = 0; c < listaDisciplinas.length; c++) {
            await nota.create(id, listaDisciplinas[c].id)
        }

        if (dados.estado) {
            res.status(200).json({ status : true, menssagem : 'VOCÊ AGORA FAZ PARTE DA TURMA ' + idTurma})
        } else {
            res.status(400).json({ status : false , menssagem : 'ERRO AO ENTRAR NA TURMA ' + idTurma})
        }
    },

    infosAluno : async (req,res) => {

        const {id,idTurma} = req.params

        let dadosAluno = await userAluno.readById(id)
        dadosAluno = dadosAluno.infos[0]

        let dadosTurma = await turmas.readById(idTurma)
        dadosTurma = dadosTurma.infos[0]

        const materias = await disciplinas.readByTurma(idTurma);
        const listaDisciplinas = []

        for (let c = 0; c < materias.length; c++) {
            listaDisciplinas.push({

                id : materias[c].id,
                nome : materias[c].nome,
                descricao : materias[c].descricao,
                idTurma : materias[c].idTurma,
                notas : {}
            })
        }
        
        const notasMateria = []

        for (let c = 0; c < materias.length; c++) {
            listaDisciplinas[c].notas = (await nota.readWhere(id , materias[c].id))
        }

        const dados = {
            dadosAluno : dadosAluno,
            dadosTurma : dadosTurma,
            disciplinas : listaDisciplinas,
        }

        res.status(200).json(dados)
    }
}