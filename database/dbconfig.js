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
    dialect : "mysql"
})


export const objetoDeConfig = (nomeTabela) => {
    return {
        freezeTableName: true, 
        tableName: nomeTabela, 
        timestamps: false, 
        sync: { force: false }
    }
}

export const objetoNotas = {
    freezeTableName: true, 
        tableName: 'notas', 
        timestamps: false, 
        primaryKey : false,
        sync: { force: false }
}