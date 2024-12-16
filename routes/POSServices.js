const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const exeQuery = require('../helpers/exeQuery.js');

const router = express.Router();
router.use(express.json());

// router.get('/GetProductsByOrgId', (req, res) => {
//     const data = req.query;
//     handleRecord(req, res, data, OperationEnums().GETPRODSORGID);
// });
// router.get('/GetProductsById', (req, res) => {
//     const data = req.query;
//     handleRecord(req, res, data, OperationEnums().GETPRODSBYID);
// });

router.get('/GetCategoryItems', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETCATITEMS);
});

router.get('/GetAdditionalProdDetails', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().PRODADDETAIL);
});
router.get('/GetOrderView', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETORDDET);
});

router.post('/GetPOSStoreProducts', async (req, res) => {
    try {
        const data = req.body;
        const { OrgId, UserId, StoreId } = req.body;
        if (data.BarCode != 0) {
            data.BarCode = `''${data.BarCode}''`;
        } else {
            data.BarCode = 'NULL';
        }
        if (StoreId == 0) {
            const results = await exeQuery.getStoresByUsers(OrgId, UserId);
            data.AllStores = results[0].Stores;
        } else {
            data.AllStores = StoreId; 
        }
        handleRecord(req, res, data, OperationEnums().GETPOSPRODUCTS);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching store products.' });
    }
});

module.exports = router;