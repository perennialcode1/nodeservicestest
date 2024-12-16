const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const dbUtility = require('../dbUtility.js');
const exeQuery = require('../helpers/exeQuery.js');

const  router = express.Router();
router.use(express.json());

//#region Login Service
router.post('/SignIn', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        handleRecord(req, res, data, OperationEnums().APPSIGNIN);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Users' });
    }
});
router.post('/ChangePassword', async (req, res) => {
    try {
        const { NewPassword, Name, OldPassword, OrgId } = req.body;
        console.log(req.body);
        const ChangePassword = `update dbo.Users SET Password = '${NewPassword}'
        where Name = '${Name}' AND Password = '${OldPassword}'  AND OrgId = ${OrgId}`;
        const results = await dbUtility.executeQueryrowsAffected(ChangePassword);
        if (results[0] == 0) {
            return res.status(200).json({ message: 'User not found or old password incorrect', Status: false });
        }else {
            res.status(200).json({ message: 'Password changed successfully', Status: true });
        }
       
    } catch (error) {
        res.status(200).json({ message: 'Error updating password', Status: false });
    }
});

router.get('/getOrders',(req, res) => {
    const data = req.query;
    if (data.OrderNo != 0) {
        data.OrderNo = `''${data.OrderNo}''`;
    } else {
        data.OrderNo = 'NULL';
    }
    handleRecord(req, res, data, OperationEnums().APPORDERLIST);
});




router.get('/InventoryDashboard', async (req, res) => {
    try {
        const { OrgId, UserId } = req.query;
        let { StoreId } = req.query; 
        let storeIdCondition = '';
        let results = [];
        if (StoreId === '0') {
            results = await exeQuery.getStoresByUsers(OrgId, UserId);
            StoreId = results[0].Stores;
            storeIdCondition = `AND StoreId IN (${StoreId})`;
        }
        else {
            storeIdCondition = `AND StoreId = '${StoreId}'`;
        }
        const mostOrderedProductsQuery = `
            SELECT TOP 4
                ProductId, PR.Name as ProductName, StoreId, COUNT(*) AS ProductCount, CAT.Name as CategoryName,STO.Name as StoreName
            FROM dbo.PurchaseTransactionDetails POD   INNER JOIN dbo.Products PR ON PR.Id = POD.ProductId 
            inner join dbo.Categories CAT ON CAT.Id = PR.CategoryId INNER JOIN dbo.PurchaseTransaction PT ON PT.Id = POD.TransactionId
            inner join dbo.Stores STO ON STO.Id = StoreId WHERE POD.OrgId = '${OrgId}' AND TransactionType = 'PURCHASEORDER' ${storeIdCondition}
            GROUP BY StoreId, ProductId, PR.Name, CAT.Name, STO.Name   ORDER BY ProductCount DESC;
        `;
   
        const pendingIndentsQuery = `
            select TOP 4 IndentNo,  SI.IndentDt, STO.Name as StoreName
            FROM dbo.StockIndent SI inner join  dbo.Stores STO ON STO.Id = SI.StoreId
            WHERE IndentStatus = 2 AND SI.OrgId = '${OrgId}' ${storeIdCondition}  AND SI.IsActive = 1
            GROUP BY IndentNo, SI.IndentDt, STO.Name
            ORDER BY SI.IndentDt DESC;
        `;
        console.log(pendingIndentsQuery);
        const recentStockRequestsQuery = `
            SELECT TOP 3  PT.Id, PT.Status,STO.Name as StoreName,  Su.SupplierName,PT.AutoGenTransactionNo,PT.RequestDate,
            (SELECT COUNT(*) FROM dbo.PurchaseTransactionDetails WHERE TransactionId = PT.Id AND IsActive = 1) AS TransactionDetailCount
             FROM dbo.PurchaseTransaction  PT
            INNER JOIN dbo.Stores STO ON STO.Id = PT.StoreId INNER JOIN dbo.Supplier SU ON SU.Id = PT.SupplierId
             WHERE TransactionType = 'PURCHASEREQUEST'  AND PT.OrgId = '${OrgId}' ${storeIdCondition}    ORDER BY Id DESC;`
             ;
        console.log(recentStockRequestsQuery);
        const TotalStockQuery = `SELECT SUM(InStock * Prices) as TotalStock FROM dbo.StoreProducts WHERE OrgId = '${OrgId}' ${storeIdCondition} `
        ;
        console.log(TotalStockQuery);
        const TotalPurchaseQuery = `SELECT sum(PaidAmount) as TotalPurchase FROM dbo.PurchaseTransaction  WHERE OrgId = '${OrgId}' AND ReceiveDate BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()`
            ; //presentMonth totpurchase
        console.log(TotalPurchaseQuery);
        const topSalesQuery = ` SELECT TOP 3  * FROM dbo.Stats_TopProducts WHERE OrgId = '${OrgId}'`
        ;
        console.log(topSalesQuery);
        const recentCustomersQuery = `
            SELECT TOP 3  CU.Name, CU.Mobile, CU.OrgId, CU.CreatedBy, US.UserId, US.StoreId, CA.City, STO.Name as StoreName
            FROM dbo.Customers CU  Inner Join dbo.CustomerAddress CA ON CA.CustId = CU.Id
            INNER JOIN dbo.Userstores US ON US.UserId = CU.CreatedBy inner join dbo.Stores STO ON STO.Id = US.StoreId
            WHERE CU.OrgId = '${OrgId}' ${storeIdCondition}  ORDER BY CU.Id DESC;
        `;
        console.log(recentCustomersQuery);
        const expiredProductsQuery = `
            SELECT TOP 3
                PR.Id as ProductId, SP.StoreId, PR.Name, PR.ExpiredDate, PR.OrgId, CAT.Name as CategoryName,STO.Name as StoreName 
            FROM dbo.Products PR  inner join dbo.Categories CAT ON CAT.Id = PR.CategoryId
            INNER JOIN dbo.StoreProducts SP ON SP.ProductId = PR.Id inner join dbo.Stores STO ON STO.Id = SP.StoreId
            WHERE PR.ExpiredDate < CAST(GETDATE() AS DATE) AND PR.OrgId = '${OrgId}' ${storeIdCondition}
            ORDER BY PR.ExpiredDate ASC;
        `;
        console.log(expiredProductsQuery);
        const topPOsFromSuppliersQuery =    `SELECT TOP 3  pt.SupplierId,  s.SupplierName,  s.City,  COUNT(*) AS Orders
                                        FROM 
                                            dbo.purchasetransaction pt
                                        INNER JOIN 
                                            dbo.supplier s ON pt.SupplierId = s.Id
                                        WHERE 
                                            pt.OrgId = '${OrgId}'
                                        GROUP BY 
                                            pt.supplierId, s.SupplierName, s.City
                                        ORDER BY 
                                            Orders DESC;
                                        `;
        console.log(expiredProductsQuery);

        const recentSuppliersQuery =  `select Top 3 SupplierName, PhoneNo, EmailId, City from dbo.supplier
            where OrgId = '${OrgId}'
            ORDER BY
                Id DESC;`;
        console.log(recentSuppliersQuery);
        
        const PendingInvoiceQuery =  `select Top 3 AutoGenTransactionNo, Invoiceamount,CAST(Invoicedate AS DATE) AS InvoiceDate  from dbo.PurchaseTransaction 
        where InvoiceStatus = 'PENDING' AND OrgId = '${OrgId}' AND IsActive = 1 ${storeIdCondition}
            ORDER BY Id DESC;`;
        console.log(PendingInvoiceQuery);
        const [
            mostOrderedProducts, pendingIndents, recentStockRequests, topSales, recentCustomers, expiredProducts,
            TotalStock, TotalPurchase, TopPOsFromSuppliers, RecentSuppliers, PendingInvoice
        ] = await Promise.all([
            dbUtility.executeQuery(mostOrderedProductsQuery),
            dbUtility.executeQuery(pendingIndentsQuery),
            dbUtility.executeQuery(recentStockRequestsQuery),
            dbUtility.executeQuery(topSalesQuery),
            dbUtility.executeQuery(recentCustomersQuery),
            dbUtility.executeQuery(expiredProductsQuery),
            dbUtility.executeQuery(TotalStockQuery),
            dbUtility.executeQuery(TotalPurchaseQuery),
            dbUtility.executeQuery(topPOsFromSuppliersQuery),
            dbUtility.executeQuery(recentSuppliersQuery),
            dbUtility.executeQuery(PendingInvoiceQuery)
            
        ]);
        res.json({
            mostOrderedProducts,
            pendingIndents,
            recentStockRequests,
            recentCustomers,
            topSales,
            expiredProducts,
            TotalStock,
            TotalPurchase,
            TopPOsFromSuppliers,
            RecentSuppliers,
            PendingInvoice
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
});


router.get('/getDashboardCounts', (req, res) => {
    const { OrgId, UserId } = req.query;
    const data = { "OrgId": OrgId, "UserId": UserId };
    handleRecord(req, res, data, OperationEnums().APPDASHBCNT);
});

router.get('/getCategories', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().APPCATGRLIST);
});//

router.get('/getBrands', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().APPBRANDLIST);
});//


router.get('/getStores', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().APPSTRELIST);
});//


router.get('/getCustomer', (req, res) => {
    const {OrgId, CustomerId } = req.query;
    const data = { "OrgId": OrgId, "CustomerId": CustomerId };
    handleRecord(req, res, data, OperationEnums().APPCUSTLIST);
});//


router.get('/GetSuppliers', (req, res) => {
    //const { OrgId } = req.params;
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().APPSUPLRLIST);
});//


router.get('/GetPrivacyPolicy', async (req, res) => {
    try {
        const privacyPolicyLink = "https://ibizaccounts.com/privacy%20policy.html";
        res.json({ ResultData: privacyPolicyLink });
    } catch (error) {
        next(error);
    }
});


router.get('/GetTermAndConditions', async (req, res) => {
    try {
        const termsAndConditionsLink = "https://ibizaccounts.com/terms%20&%20conditions.html";
        res.json({ ResultData: termsAndConditionsLink });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
router.post('/GetProducts', async (req, res) => {
    try {
        const data = req.body;  // Assuming req.body contains the Products data
        //const { Products } = require('../Models/ProductsMdl');
        //const data = new Products(ProductsData); // Creating a new Products instance
        //console.log(data);
        handleRecord(req, res, data, OperationEnums().APPPRODSELC);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error  Products' });
    }
});
router.get('/getReFundOrders',(req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETREFUND);
});
//#endregion Login Service
module.exports = router;





/*
below are the services used in App 
const String getUserLoginApi = '${baseUrl}Auth/SignIn';//
const String getInventoryDashboardApi = '${baseUrl}dashboard/InventoryDashboard?';
const String getDashboardCountsApi = '${baseUrl}Dashboard/getDashboardCounts?';
const String getCategoriesDetailsApi = '${baseUrl}Product/getCategories?';//
const String getBandsApi = '${baseUrl}Product/getBrands?OrgId=';//
const String getProductDetailsApi = '${baseUrl}Product/GetProducts';
const String getStoresDetailsApi = '${baseUrl}Settings/getStores?OrgId=';//
const String getCategoriesListDetailsApi = '${baseUrl}Product/getCategories?OrgId=';//
const String getCustomerDetailsApi = '${baseUrl}Customer/getCustomer?';
const String getOrdersDetailsApi = '${baseUrl}Billing/getOrders?';
const String getPrivacyPolicyApi = '${baseUrl}GetPrivacyPolicy';//
const String getTermAndConditionsApi = '${baseUrl}GetTermAndConditions';//
const String getSuppliersApi = '${baseUrl}Inventory/GetSuppliers?OrgId=';//
*/
















