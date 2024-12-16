const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');


const router = express.Router();
router.use(express.json());
//#region Units
router.get('/getUnits', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().UNITSLIST);
});

router.post('/InsertUnits', async (req, res) => {
    try {
        const UnitsData = req.body; // Assuming req.body contains the Units data
        const { Units } = require('../Models/UnitsMdl.js');
        const data = new Units(UnitsData); // Creating a new Units instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().UNITSINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting Units' });
    }
});
router.post('/UpdateUnits', async (req, res) => {
    try {
        const UnitsData = req.body; // Assuming req.body contains the Units data
        const { Units } = require('../Models/UnitsMdl.js');
        const data = new Units(UnitsData); // Creating a new Units instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().UNITSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Units' });
    }
});

router.post('/DeleteUnits', (req, res) => {
    const { Id, UpdatedBy } = req.body;
    const data = { "Id": Id, "UpdatedBy": UpdatedBy };
    handleRecord(req, res, data, OperationEnums().UNITSDELT);
});
//#endregion Units
//#region Roles
// router.get('/getroles', (req, res) => {
//     exeQuery.getAllRoles((error, results) => {
//         console.log(results);
//         handleResponse(res, error, results);
//     });
// });
//#endregion Roles
//#region PaymentTypes
router.get('/getPaymentTypes', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().PAYMTLIST);
});

router.post('/DelPaymentTypes', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().PAYMTDELT);
});

router.post('/InsertPaymentTypes', async (req, res) => {
    try {
        const PaymentTypesData = req.body; // Assuming req.body contains the payment types data
        const { PaymentTypes } = require('../Models/PaymentTypesMdl');
        const data = new PaymentTypes(PaymentTypesData); // Creating a new PaymentTypes instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PAYMTINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating payment type' });
    }
});

router.post('/UpdatePaymentTypes', async (req, res) => {
    try {
        const PaymentTypesData = req.body; // Assuming req.body contains the payment types data
        const { PaymentTypes } = require('../Models/PaymentTypesMdl');
        const data = new PaymentTypes(PaymentTypesData); // Creating a new PaymentTypes instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PAYMTUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating payment type' });
    }
});
//#endregion PaymentTypes

//#region Users

//#endregion

//#region Stores
router.get('/getStores', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().STRELIST);
});
router.post('/InsertStores', async (req, res) => {
    try {
        const StoresData = req.body; // Assuming req.body contains the customer data
        const { Stores } = require('../Models/StoresMdl');
        const data = new Stores(StoresData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STREINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/UpdateStores', async (req, res) => {
    try {
        const StoresData = req.body; // Assuming req.body contains the customer data
        const { Stores } = require('../Models/StoresMdl');
        const data = new Stores(StoresData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STREUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
//#endregion Stores
//#region ExpenseTypes
router.get('/getExpenseTypes', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().EXPTPLIST);
});
router.post('/InsertExpenseTypes', async (req, res) => {
    try {
        const ExpenseTypesData = req.body; // Assuming req.body contains the expense types data
        const { ExpenseTypes } = require('../Models/ExpenseTypesMdl');
        const data = new ExpenseTypes(ExpenseTypesData); // Creating a new ExpenseTypes instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().EXPTPINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating expense type' });
    }
});

router.post('/UpdateExpenseTypes', async (req, res) => {
    try {
        const ExpenseTypesData = req.body; // Assuming req.body contains the expense types data
        const { ExpenseTypes } = require('../Models/ExpenseTypesMdl');
        const data = new ExpenseTypes(ExpenseTypesData); // Creating a new ExpenseTypes instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().EXPTPUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating expense type' });
    }
});

router.post('/DelExpenseTypes', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().EXPTPDELT);
});
//#endregion ExpenseTypes

//#region Taxes

router.get('/GetTaxes', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().TAXTPLIST);
});

router.post('/InsertTaxes', async (req, res) => {
    try {
        const TaxesData = req.body; // Assuming req.body contains the customer data
        const { Taxes } = require('../Models/TaxesMdl');
        const data = new Taxes(TaxesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().TAXTPINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/UpdateTaxes', async (req, res) => {
    try {
        const TaxesData = req.body; // Assuming req.body contains the customer data
        const { Taxes } = require('../Models/TaxesMdl');
        const data = new Taxes(TaxesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().TAXTPUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});

router.post('/DelTaxes', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().TAXTPDELT);
});
//#endregion Taxes

//#region UserStores
router.get('/getUserStores', (req, res) => {
    const { UserId } = req.query;
    const data = { "UserId": UserId };
    handleRecord(req, res, data, OperationEnums().USRSTRUSR);
});

router.post('/UpdateUserStores', async (req, res) => {
    try {
        const UserStoresData = req.body; // Assuming req.body contains the UserStores data
        const { UserStores } = require('../Models/UserStoresMdl');
        const data = new UserStores(UserStoresData); // Creating a new UserStores instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().USRSTRUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating UserStores' });
    }
});

//#endregion UserStores

//#region Discounts
router.get('/GetDiscounts/:OrgId/:IsActive', (req, res) => {
    const { OrgId,IsActive } = req.params;
    const data = { "OrgId": OrgId,"IsActive":IsActive };
    handleRecord(req, res, data, OperationEnums().DISCTLIST);
});
router.post('/InsertDiscounts', async (req, res) => {
    try {
        const DiscountsData = req.body; // Assuming req.body contains the customer data
        const { Discounts } = require('../Models/DiscountsMdl');
        const data = new Discounts(DiscountsData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().DISCTINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/UpdateDiscounts', async (req, res) => {
    try {
        const DiscountsData = req.body; // Assuming req.body contains the customer data
        const { Discounts } = require('../Models/DiscountsMdl');
        const data = new Discounts(DiscountsData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().DISCTUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});

router.post('/DelDiscounts', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().DISCTDELT);
});

//#endregion Discounts

//#region VariantTypes
router.get('/getVariantTypes', (req, res) => {
    //const {OrgId} = req.query;
    const data = { "OrgId": "0" };
    handleRecord(req, res, data, OperationEnums().VARNTLIST);
});

router.post('/InsertVariantTypes', async (req, res) => {
    try {
        const VariantTypesData = req.body; // Assuming req.body contains the VariantTypes data
        const { VariantTypes } = require('../Models/VariantTypesMdl');
        const data = new VariantTypes(VariantTypesData); // Creating a new VariantTypes instance
        handleRecord(req, res, data, OperationEnums().VARNTINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting VariantTypes' });
    }
});
router.post('/UpdateVariantTypes', async (req, res) => {
    try {
        const VariantTypesData = req.body; // Assuming req.body contains the VariantTypes data
        const { VariantTypes } = require('../Models/VariantTypesMdl');
        const data = new VariantTypes(VariantTypesData); // Creating a new VariantTypes instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().VARNTUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating VariantTypes' });
    }
});
//#endregion Variant Types
//#region Staff 
router.get('/getStaff', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().STFGETS);
});
router.post('/DelStaff', (req, res) => {
try {
    const Data = req.body; 
    handleRecord(req, res, Data, OperationEnums().STFDELT);
} catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error inserting Staff' });
}
});
router.post('/InsertStaff', async (req, res) => {
    try {
        const Data = req.body; 
        handleRecord(req, res, Data, OperationEnums().STFINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting Staff' });
    }
});

router.post('/UpdateStaff', async (req, res) => {
    try {
        const Data = req.body;
        handleRecord(req, res, Data, OperationEnums().STFUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Staff' });
    }
});
//#endregion Staff
//#region POSTerminals 
router.get('/getPosTerminals',(req, res) => {
    //const {OrgId} = req.query;
    //const data = { "OrgId": OrgId };
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().POTERMGET);
});
router.post('/InsertPosTerminals', async (req, res) => {
    try {
        const PosTerminalsData = req.body; 
        handleRecord(req, res, PosTerminalsData, OperationEnums().POTERMINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating POS terminal' });
    }
});
router.post('/UpdatePosTerminals', async (req, res) => {
    try {
        const PosTerminalsData = req.body; 
        handleRecord(req, res, PosTerminalsData, OperationEnums().POTERMUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating POS terminal' });
    }
});
router.post('/DelPosTerminals', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().POTERMDELT);
});
//#endregion POSTerminals
//#region Metal Rates for Jewellery (Gold,Silver)
router.post('/InsertMetalRates', async (req, res) => {
    try {
        const Data = req.body; 
        handleRecord(req, res, Data, OperationEnums().METRTSINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating POS terminal' });
    }
});
router.get('/getMetalRates',(req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().METRTEGETS);
});
//#endregion Metal Rates

router.get('/getStoreTables', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().STTAGETS);
});

router.post('/DelStores', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().STREDELT);
});




router.post('/DelPriceLists', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().PRICDELT);
});




router.post('/DelGroupProdDiscount', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().GROUDELT);
});
router.post('/DelCustomerGroups', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().CUGRDELT);
});
router.post('/DelStoreProdDiscount', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().STPRDELT);
});





router.post('/InsertStoreTables', async (req, res) => {
    try {
        const StoreTablesData = req.body; // Assuming req.body contains the store tables data
        const { StoreTables } = require('../Models/StoreTablesMdl');
        const data = new StoreTables(StoreTablesData); // Creating a new StoreTables instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STTAINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating store table' });
    }
});

router.post('/UpdateStoreTables', async (req, res) => {
    try {
        const StoreTablesData = req.body; // Assuming req.body contains the store tables data
        const { StoreTables } = require('../Models/StoreTablesMdl');
        const data = new StoreTables(StoreTablesData); // Creating a new StoreTables instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STTAUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating store table' });
    }
});

router.post('/InsertPriceLists', async (req, res) => {
    try {
        const PriceListsData = req.body; // Assuming req.body contains the price lists data
        const { PriceLists } = require('../Models/PriceListsMdl');
        const data = new PriceLists(PriceListsData); // Creating a new PriceLists instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PRICINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating price list' });
    }
});

router.post('/UpdatePriceLists', async (req, res) => {
    try {
        const PriceListsData = req.body; // Assuming req.body contains the price lists data
        const { PriceLists } = require('../Models/PriceListsMdl');
        const data = new PriceLists(PriceListsData); // Creating a new PriceLists instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PRICUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating price list' });
    }
});


router.post('/InsertGroupProdDiscount', async (req, res) => {
    try {
        const GroupProdDiscountData = req.body; // Assuming req.body contains the group product discount data
        const { GroupProdDiscount } = require('../Models/GroupProdDiscountMdl');
        const data = new GroupProdDiscount(GroupProdDiscountData); // Creating a new GroupProdDiscount instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().GROUINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating group product discount' });
    }
});

router.post('/UpdateGroupProdDiscount', async (req, res) => {
    try {
        const GroupProdDiscountData = req.body; // Assuming req.body contains the group product discount data
        const { GroupProdDiscount } = require('../Models/GroupProdDiscountMdl');
        const data = new GroupProdDiscount(GroupProdDiscountData); // Creating a new GroupProdDiscount instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().GROUUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating group product discount' });
    }
});

router.post('/InsertCustomerGroups', async (req, res) => {
    try {
        const CustomerGroupsData = req.body; // Assuming req.body contains the customer groups data
        const { CustomerGroups } = require('../Models/CustomerGroupsMdl');
        const data = new CustomerGroups(CustomerGroupsData); // Creating a new CustomerGroups instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().CUGRINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer group' });
    }
});

router.post('/UpdateCustomerGroups', async (req, res) => {
    try {
        const CustomerGroupsData = req.body; // Assuming req.body contains the customer groups data
        const { CustomerGroups } = require('../Models/CustomerGroupsMdl');
        const data = new CustomerGroups(CustomerGroupsData); // Creating a new CustomerGroups instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().CUGRUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating customer group' });
    }
});

router.post('/InsertStoreProdDiscount', async (req, res) => {
    try {
        const StoreProdDiscountData = req.body; // Assuming req.body contains the store product discount data
        const { StoreProdDiscount } = require('../Models/StoreProdDiscountMdl');
        const data = new StoreProdDiscount(StoreProdDiscountData); // Creating a new StoreProdDiscount instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STPRINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating store product discount' });
    }
});

router.post('/UpdateStoreProdDiscount', async (req, res) => {
    try {
        const StoreProdDiscountData = req.body; // Assuming req.body contains the store product discount data
        const { StoreProdDiscount } = require('../Models/StoreProdDiscountMdl');
        const data = new StoreProdDiscount(StoreProdDiscountData); // Creating a new StoreProdDiscount instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STPRUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating store product discount' });
    }
});



module.exports = router;