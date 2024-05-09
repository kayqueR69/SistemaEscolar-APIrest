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

professor.hasMany(turma,{foreignKey : "idProfessor"})
turma.hasMany(aluno,{foreignKey : "idTurma"})
turma.hasMany(disciplina,{foreignKey : "idTurma"})
aluno.hasMany(notas,{foreignKey : "idAluno"})
disciplina.hasMany(notas,{foreignKey : "idDisciplina"})
turma.belongsTo(professor, {onDelete: 'CASCADE'})
aluno.belongsTo(turma,{onDelete: 'SET NULL'})
disciplina.belongsTo(turma,{onDelete: 'CASCADE'})
    notas.belongsTo(disciplina,{onDelete: 'CASCADE'})
notas.belongsTo(aluno,{onDelete: 'CASCADE'})

db.sync({ force : false})

export { professor, turma, aluno, disciplina, notas }