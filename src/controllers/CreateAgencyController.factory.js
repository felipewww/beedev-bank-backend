import CreateAgencyController from "./CreateAgencyController.js";
import {RequestError} from "../utils/RequestError.js";

export async function CreateAgencyControllerFactory(req) {
    const createAgencyCtrl = new CreateAgencyController();

    let result = {
        status: true,
        id: null,
        error: false,
        statusCode: 200,
    }

    try {
        validateAgency(req.body);

        const ctrlResult = await createAgencyCtrl.create(
            req.body.number,
            req.body.address,
        );

        result.id = ctrlResult[0]
    } catch (e) {
        if (e.name === 'RequestError') {
            result.statusCode = 400;
            result.error = e.message;
        } else {
            result.statusCode = 500;
        }

        result.status = false;
    }

    return result;
}

function validateAgency(reqBody) {
    let error = false;

    if (reqBody.number.indexOf('?') >= 0) {
        error = "Agency number can't have ?";
    }

    if (reqBody.number.indexOf(' ') >= 0) {
        error = "Agency number can't blank spaces";
    }

    if (reqBody.number.length >= 8) {
        error = "Agency number can't have more than 8 chars"
    }

    if (error) {
        throw new RequestError(error);
    }
}
