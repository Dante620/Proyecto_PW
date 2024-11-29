import  Sequelize  from "sequelize";

const hostname= 'prograweb-202402-1507-db.postgres.database.azure.com';
const username= 'postgres';

const password= 'grupoPrograWeb2' ;
const database= 'toymaster';
const port= 5432;
const dialect= 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    operatorAliases:false
    });

export default sequelize;