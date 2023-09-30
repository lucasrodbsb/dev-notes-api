import { Sequelize } from "sequelize";

export const db = new Sequelize('notes-api','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

db.authenticate().then(()=>{
    console.log('connection accepted')
}).catch((err) => {
    console.log(`connection refused. error: ${err}`)
})

