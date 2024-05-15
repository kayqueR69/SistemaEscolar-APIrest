import express from 'express'
import { rotasProf } from './rotasProfessor.js'
import { rotasAluno } from './rotasAluno.js'

const router = express.Router()

// rotas

router.get('/', (req,res) => {
    res.send('teste')
})

// rotas de professor

router.post('/prof/cadastro', rotasProf.cadastro)
router.post('/prof/login', rotasProf.login)
router.put('/prof/alterar', rotasProf.alterarDado)
router.delete('/prof/deleteuser/:id', rotasProf.deleteUserProf)
router.post('/prof/criarturma', rotasProf.criarTurma)
router.get('/prof/alunos/:idTurma', rotasProf.getAlunos)
router.delete('/prof/delturma', rotasProf.deletarTurma)
router.post('/prof/adddisciplina', rotasProf.addDisciplina)
router.get('/prof/getdisciplinas/:idTurma', rotasProf.getDisciplinas)
router.put('/prof/updatedisciplina', rotasProf.updateDisciplina)
router.delete('/prof/deldisciplina', rotasProf.deletarDisciplina)
router.put('/prof/atribuirnota', rotasProf.atribuirNota)

// rotas de aluno

router.post('/aluno/cadastro', rotasAluno.cadastro)
router.post('/aluno/login', rotasAluno.login)
router.put('/aluno/altnome', rotasAluno.alterarNome)
router.delete('/aluno/deluser/:id', rotasAluno.deleteUser)
router.get('/aluno/verturmas', rotasAluno.verTurmas)
router.put('/aluno/matricula', rotasAluno.vincularTurma)
router.get('/aluno/infos/:id/:idTurma', rotasAluno.infosAluno)

// --------------------------------------------

export { router }