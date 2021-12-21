import express from 'express'
import cors from 'cors'
import CreateCustomerController from "./src/controllers/CreateCustomerController.js";
import {CreateAgencyControllerFactory} from "./src/controllers/CreateAgencyController.factory.js";
import {GetAgencyControllerFactory} from "./src/controllers/GetAgencyController.factory.js";
const app = express()

app.use(cors())
app.use(express.json())

// Model View Controller

// Banco tem filiais - agencias
// as filiais tem contas correntes que pertencem a clientes

// cliente -> conta/ag -> saldo
// pagamento desconta o saldo

app.post('/api/v1/agency', async (req, res) => {
    const result = await CreateAgencyControllerFactory(req);
    res.statusCode = result.statusCode
    res.json(result)
})

app.get('/api/v1/agency', async (req, res) => {
    const result = await GetAgencyControllerFactory(req);
    res.json(result);
})

app.post('/api/v1/customer', (req, res) => {
    const createCustomerController = new CreateCustomerController()
    createCustomerController.create(req.body.name, req.body.account);

    res.json({status: true})
})

app.listen(3020, function () {
    console.log('iniciou na porta 3020')
})
