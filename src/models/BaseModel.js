import knex from "knex";

export default class BaseModel {
    constructor(

    ) {
        this.database = knex({
            client: 'mysql2',
            connection: {
                host : 'beedoo-dev-br.cd7yndybu1ks.sa-east-1.rds.amazonaws.com',
                user : 'beedoo',
                password : '2017beedooDEV',
                database : 'beedev_bank'
            }
        });
    }

    getAll() {
        return this.database
            .select('*')
            .from(this.tableName)
    }

    create(data) {
        return this.database
            .table(this.tableName)
            .insert(data)
    }
}
