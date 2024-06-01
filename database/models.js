import Sequelize from "sequelize";
import Dot from 'dotenv'
Dot.config()

const dbConfig = {
    nome : process.env.DB_NAME, 
    host : process.env.DB_HOST, 
    user : process.env.DB_USER, 
    pass : process.env.DB_PASS
}

export const db = new Sequelize(dbConfig.nome, dbConfig.user, dbConfig.pass, {
    host: dbConfig.host,
    dialect : "mysql", 
    define : {
        timestamps : false,
        freezeTableName : true
    }
})


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
    
    media : {
        type : Sequelize.VIRTUAL,
        get () {
            return ((this.nota1 + this.nota2) / 2)
        }
    },

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

professor.hasMany(turma,{foreignKey : "idProfessor", onDelete: 'CASCADE'})
turma.hasMany(aluno,{foreignKey : "idTurma", onDelete : "SET NULL"})
turma.hasMany(disciplina,{foreignKey : "idTurma", onDelete: 'CASCADE'})
aluno.hasMany(notas,{foreignKey : "idAluno", onDelete: 'CASCADE'})
disciplina.hasMany(notas,{foreignKey : "idDisciplina", onDelete: 'CASCADE'})
turma.belongsTo(professor, {foreignKey : "idProfessor", onDelete: 'CASCADE'})
aluno.belongsTo(turma,{foreignKey : "idTurma",onDelete: 'SET NULL'})
disciplina.belongsTo(turma,{foreignKey : "idTurma",onDelete: 'CASCADE'})
notas.belongsTo(disciplina,{foreignKey : "idDisciplina",onDelete: 'CASCADE'})
notas.belongsTo(aluno,{foreignKey : "idAluno",onDelete: 'CASCADE'})

db.sync({ force : false})

export { professor, turma, aluno, disciplina, notas }