// const {AgencyModel} = require("../models/AgencyModel");
// import AgencyModel from "../models/AgencyModel";
import AgencyModel from "../models/AgencyModel.js";

export default class CreateAgencyController {
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
