const knex = require("knex");
const {BaseModel} = require("./BaseModel");

class CustomersModel extends BaseModel {
    tableName = 'customers';
}

module.exports = {
    CustomersModel
}
