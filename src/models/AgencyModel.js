const knex = require("knex");
const {BaseModel} = require("./BaseModel");
const {CustomersModel} = require("./CustomersModel");

class AgencyModel extends BaseModel {
    tableName = 'agency';
}

module.exports = {
    AgencyModel
}
