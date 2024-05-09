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

