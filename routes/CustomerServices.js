const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const { Customer } = require('../Models/CustomerMdl');
const exeQuery = require('../helpers/exeQuery');

const router = express.Router();
router.use(express.json());

router.get('/getCustomer', (req, res) => {
    const {OrgId, CustomerId } = req.query;
    const data = { "OrgId": OrgId, "CustomerId": CustomerId };
    handleRecord(req, res, data, OperationEnums().CUSTLIST);
});

router.post('/InsertCustomer', (req, res) => {
    const  CustomersJSON = req.body; 
    exeQuery.SpCustomers( CustomersJSON, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});


module.exports = router;