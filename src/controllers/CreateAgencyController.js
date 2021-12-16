const {AgencyModel} = require("../models/AgencyModel");

class CreateAgencyController {
    async create(number, address) {
        const agencyModel = new AgencyModel();

        const agencyProps = {
            number: number,
            address: address,
            // colunaErrada: true
        }

        const createdAgency = await agencyModel.create(agencyProps)

        return createdAgency;
    }
}

module.exports = {
    CreateAgencyController
}
