import express from 'express'
import cors from 'cors'

import CreateAgencyController from './src/controllers/CreateAgencyController.js'
import CreateCustomerController from "./src/controllers/CreateCustomerController.js";
import {RequestError} from "./src/utils/RequestError.js";
const app = express()

app.use(cors())
app.use(express.json())

// Model View Controller

// Banco tem filiais - agencias
// as filiais tem contas correntes que pertencem a clientes

// cliente -> conta/ag -> saldo
// pagamento desconta o saldo

app.post('/api/v1/agency', async (req, res) => {

    const createAgencyCtrl = new CreateAgencyController();

    let result = {
        status: true,
        id: null,
        error: false,
    }

    try {
        validateAgency(req.body);

        const ctrlResult = await createAgencyCtrl.create(
            req.body.number,
            req.body.address,
        );

        result.id = ctrlResult[0]
        res.statusCode = 200
    } catch (e) {
        if (e.name === 'RequestError') {
            res.statusCode = 400;
            result.error = e.message;
        } else {
            res.statusCode = 500;
        }

        result.status = false;
    }

    res.json(result)
})

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

app.post('/api/v1/customer', (req, res) => {
    const createCustomerController = new CreateCustomerController()
    createCustomerController.create(req.body.name, req.body.account);

    res.json({status: true})
})

app.listen(3020, function () {
    console.log('iniciou na porta 3020')
})
