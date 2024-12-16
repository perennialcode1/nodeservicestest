const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');

const router = express.Router();
router.use(express.json());


router.get('/GetSupplierPOs', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETSUPPOS);
});

router.get('/GetSupplierPaymnts', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETSUPPAYS);
});

router.get('/GetSupplierPOPaymntsVIEW', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().SUPPAYSVIEW);
});


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

module.exports = router;