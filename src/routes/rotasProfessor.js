import { userProf } from "../../database/controllers/professor.js";
import { userAluno } from "../../database/controllers/aluno.js";
import { disciplinas } from "../../database/controllers/disciplina.js";
import { turmas } from "../../database/controllers/turma.js";
import { nota } from "../../database/controllers/notas.js";

export const rotasProf = {

    cadastro : async (req,res) => {
        const {nome,especializacao} = req.body

        const dados = await userProf.create(nome,especializacao)

        if (dados.criado == true) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    login : async (req,res) => {
        const {id,nome} = req.body

        const dados = await userProf.readWhere(id,nome)

        if (dados.id) {
            res.status(200).json({ log : true, infos : dados})
        } else {
            res.status(400).json({ log : false, infos : dados})
        }
    },

    alterarDado : async (req,res) => {
        const {id,campo,valor} = req.body

        const dados = await userProf.update(id,campo,valor)
        
        if (dados.estado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    deleteUserProf : async (req,res) => {
        const id = req.params.id

        const dados = await userProf.delete(id)

        if (dados.estado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    criarTurma : async (req,res) => {
        const id = req.body.idProfessor

        const dados = await turmas.create(id)

        if (dados.status) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    getAlunos : async (req,res) => {
        const idTurma = req.params.idTurma

        const dados = await userAluno.readByTurma(idTurma)

        res.status(200).json(dados)
    },

    deletarTurma : async (req,res) => {
        const id = req.body.id

        const dados = await turmas.delete(id)

        if (dados.deletada) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    addDisciplina : async (req,res) => {

        const {idTurma,nome,descricao} = req.body

        const dados = await disciplinas.create(idTurma,nome,descricao)
        const alunos = await userAluno.readByTurma(idTurma)

        const idDisciplinaCriada = dados.infos.id

        for (let c = 1; c < alunos.qtdAlunos + 1; c++) {
            await nota.create(c,idDisciplinaCriada)
        }

        if (dados.criada) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    getDisciplinas : async (req,res) => {
        const idTurma = req.params.idTurma

        const dados = await disciplinas.readByTurma(idTurma)

        res.json(dados)
    },

    updateDisciplina : async (req,res) => {
        const {id,campo,valor} = req.body

        const dados = await disciplinas.update(id,campo,valor)

        if (dados.estado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    deletarDisciplina : async (req,res) => {
        const id = req.body.id

        const dados = await disciplinas.delete(id)

        if (dados.deletado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    },

    atribuirNota : async (req,res) => {
        const {idAluno,idDisciplina,numNota,valor} = req.body

        const dados = await nota.updateValor(idAluno,idDisciplina,numNota,valor)

        if (dados.estado) {
            res.status(200).json(dados)
        } else {
            res.status(400).json(dados)
        }
    }

}