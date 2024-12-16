const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const exeQuery = require('../helpers/exeQuery');
const router = express.Router();

router.use(express.json());
//#region Quotations
router.post('/SaveQuotaionDetails', (req, res) => {
    const TotJson = req.body; 
    exeQuery.SpSaveQuotaionDetails(TotJson, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
router.get('/getQuotations',(req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().QUOTGETLIST);
});
router.get('/getQuotationsById',(req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().QUOTGETBYID);
});
//#endregion Quotations

router.get('/getOrders',(req, res) => {
    const data = req.query;
    if (data.OrderNo != 0) {
        data.OrderNo = `${data.OrderNo}`;
    } else {
        data.OrderNo = 'NULL';
    }
    handleRecord(req, res, data, OperationEnums().ORDERLIST);
});
//Get the list of All Pending Order payments that has Status of 6 (i.e) Partially paid
router.post('/getPendingOrderPayments', async (req, res) => {
    try {
        const Data = req.body; 
        console.log(Data);
        handleRecord(req, res, Data, OperationEnums().PENDINGPYMTLIST);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
// Save Sale Order,OrderDetail, Payments.
router.post('/SaveOrders', (req, res) => {
    const TotJson = req.body; 
    exeQuery. SpSaveOrderDetails(TotJson, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
//Get List of Orders 
router.post('/getOrdersList', async (req, res) => {
    try {
        const Data = req.body; 
        handleRecord(req, res, Data, OperationEnums().ORDERLIST);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating POS terminal' });
    }
});
//Get Order By Passing Order No
router.get('/getOrdersById',(req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().ORDERSELC);
});
//Service to Update Refunds in an order
router.post('/RefundOrders', (req, res) => {
    const TotJson = req.body; 
    exeQuery.SpRefundOrders(TotJson, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
//Payments made on Pending payment Orders
router.post('/PayPendingOrders', (req, res) => {
    const TotJson = req.body; 
    exeQuery.SpPayPendingOrders(TotJson, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});


module.exports = router;