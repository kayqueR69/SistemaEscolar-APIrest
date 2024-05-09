import { Sequelize } from "sequelize";
import { db, objetoDeConfig, objetoNotas } from "./dbconfig.js";

const professor = db.define('professor', {

    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    nome : Sequelize.STRING(40),
    especializacao : Sequelize.STRING(255),

}, objetoDeConfig('professor'))

const turma = db.define('turma', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    idProfessor : {
        type : Sequelize.INTEGER,
        references : {
            model : professor,
            key : 'id',
            onDelete : 'CASCADE'
        }
    }
}, objetoDeConfig('turma'))


const aluno = db.define('aluno', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nome : Sequelize.STRING(40),

    idTurma : {
        type : Sequelize.INTEGER,
        references : {
            model : turma,
            key : 'id',
            onDelete : 'CASCADE'
        }
    }
}, objetoDeConfig('aluno'))

const disciplina = db.define('disciplina', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nome : Sequelize.STRING(40),
    descricao : Sequelize.STRING(40),

    idTurma : {
        type : Sequelize.INTEGER,
        references : {
            model : turma,
            key : 'id',
            onDelete : 'CASCADE'
        }
    }

}, objetoDeConfig('disciplina'))

const notas = db.define('notas', {
    nota1 : Sequelize.FLOAT,
    nota2 : Sequelize.FLOAT,

    idAluno : {
        type : Sequelize.INTEGER,
        references : {
            model : aluno,
            key : 'id',
            onDelete : 'CASCADE'
        }
    },
    idDisciplina : {
        type : Sequelize.INTEGER,
        references : {
            model : disciplina,
            key : 'id',
            onDelete : 'CASCADE'
        }
    }
}, objetoNotas)

notas.removeAttribute('id')

export { professor, turma, aluno, disciplina, notas }