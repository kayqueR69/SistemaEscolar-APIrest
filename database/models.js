import { Sequelize } from "sequelize";
import { db } from "./dbconfig.js";

const professor = db.define('professor', {

    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    nome : Sequelize.STRING(40),
    especializacao : Sequelize.STRING(255),

})

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
})


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
            onDelete : 'SET NULL'
        }
    }
})

const disciplina = db.define('disciplina', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    nome : Sequelize.STRING(40),
    descricao : Sequelize.STRING(255),

    idTurma : {
        type : Sequelize.INTEGER,
        references : {
            model : turma,
            key : 'id',
            onDelete : 'CASCADE'
        }
    }

})

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
})

notas.removeAttribute('id')

async function criarTabelas() {
    await professor.sync({force : false})
    await turma.sync({force : false})
    await aluno.sync({force : false})
    await disciplina.sync({force : false})
    await notas.sync({force : false})
}

criarTabelas()

export { professor, turma, aluno, disciplina, notas }