const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const dbUtility = require('../dbUtility.js');
const exeQuery = require('../helpers/exeQuery.js');

const router = express.Router();
router.use(express.json());

router.get('/getDashboardCounts', (req, res) => {
    const { OrgId, UserId } = req.query;
    const data = { "OrgId": OrgId, "UserId": UserId };
    handleRecord(req, res, data, OperationEnums().DASHBCNT);
});
router.get('/getTopSales', (req, res) => {
    const { OrgId } = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().DASHTPPD);
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
                        POD.ProductId, 
                        PR.Name AS ProductName, 
                        StoreId, 
                        COUNT(*) AS ProductCount, 
                        CAT.Name AS CategoryName, 
                        STO.Name AS StoreName,
                        COUNT(*) OVER() AS TotalProductCount -- This counts all rows in the result set
                    FROM dbo.PurchaseTransactionDetails POD  
                    INNER JOIN dbo.Products PR ON PR.Id = POD.ProductId 
                    INNER JOIN dbo.Categories CAT ON CAT.Id = PR.CategoryId
                    INNER JOIN dbo.PurchaseTransaction PT ON PT.Id = POD.TransactionId
                    INNER JOIN dbo.Stores STO ON STO.Id = StoreId
                    WHERE POD.OrgId = '${OrgId}' AND PT.TransactionType = 'PURCHASEORDER' ${storeIdCondition}
                    GROUP BY StoreId, POD.ProductId, PR.Name, CAT.Name, STO.Name  
                    ORDER BY ProductCount DESC;
                `;
   
        const pendingIndentsQuery = `
                select TOP 4 IndentNo,  SI.IndentDt, STO.Name as StoreName, SI.IndentStatus, STO.Id As StoreId, COUNT(*) OVER() AS TotalCount 
                FROM dbo.StockIndent SI inner join  dbo.Stores STO ON STO.Id = SI.StoreId
                WHERE IndentStatus = 2 AND SI.OrgId = '${OrgId}' ${storeIdCondition}  AND SI.IsActive = 1
                GROUP BY IndentNo, SI.IndentDt, STO.Name, SI.IndentStatus, STO.Id
                ORDER BY SI.IndentDt DESC;`;
                
        const recentStockRequestsQuery = `
                    SELECT TOP 3  PT.Id As PurchaseId, PT.Status,STO.Name as StoreName,  Su.SupplierName,PT.AutoGenTransactionNo,PT.RequestDate,
                    (SELECT COUNT(*) FROM dbo.PurchaseTransactionDetails WHERE TransactionId = PT.Id AND IsActive = 1) AS TransactionDetailCount,
                    COUNT(*) OVER() AS TotalPurchaseRequestCount
                    FROM dbo.PurchaseTransaction  PT
                    INNER JOIN dbo.Stores STO ON STO.Id = PT.StoreId INNER JOIN dbo.Supplier SU ON SU.Id = PT.SupplierId
                    WHERE TransactionType = 'PURCHASEREQUEST'  AND PT.OrgId = '${OrgId}' ${storeIdCondition}    ORDER BY PT.Id DESC;`;

        const TotalStockQuery = `SELECT SUM(InStock * Prices) as TotalStock FROM dbo.StoreProducts WHERE OrgId = '${OrgId}' ${storeIdCondition} `;
        const TotalPurchaseQuery = `SELECT sum(PaidAmount) as TotalPurchase FROM dbo.PurchaseTransaction  WHERE OrgId = '${OrgId}' AND ReceiveDate BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()`;
        const topSalesQuery = ` SELECT TOP 3  * FROM dbo.Stats_TopProducts WHERE OrgId = '${OrgId}'`;
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
        
        const topPOsFromSuppliersQuery =    `SELECT 
                                            TOP 3 
                                            pt.SupplierId, 
                                            s.SupplierName, 
                                            s.City, 
                                            COUNT(*) AS Orders,
                                            (SELECT COUNT(*) FROM dbo.purchasetransaction WHERE OrgId = '${OrgId}') AS TotalOrderCount
                                        FROM 
                                            dbo.purchasetransaction pt
                                        INNER JOIN 
                                            dbo.supplier s ON pt.SupplierId = s.Id
                                        WHERE 
                                            pt.OrgId = '${OrgId}'
                                        GROUP BY 
                                            pt.SupplierId, s.SupplierName, s.City
                                        ORDER BY 
                                                Orders DESC;
                                    `;


        const recentSuppliersQuery =  `SELECT 
                                            TOP 3 
                                            SupplierName, 
                                            Id, 
                                            PhoneNo, 
                                            EmailId, 
                                            City,
                                            (SELECT COUNT(*) FROM dbo.supplier WHERE OrgId = '${OrgId}') AS TotalSupplierCount
                                        FROM 
                                            dbo.supplier
                                        WHERE 
                                            OrgId = '${OrgId}'
                                        ORDER BY 
                                            Id DESC;`;
        
        
        const PendingInvoiceQuery =  `SELECT 
                                        TOP 3 
                                        AutoGenTransactionNo, 
                                        InvoiceAmount, 
                                        CAST(InvoiceDate AS DATE) AS InvoiceDate, 
                                        DiscountAmount, 
                                        Id AS PurchaseId, 
                                        Notes,
                                        (SELECT COUNT(*) 
                                        FROM dbo.PurchaseTransaction 
                                        WHERE InvoiceStatus = 'PENDING' AND OrgId = '${OrgId}' AND IsActive = 1 ${storeIdCondition}) AS TotalPendingCount
                                    FROM 
                                        dbo.PurchaseTransaction 
                                    WHERE 
                                        InvoiceStatus = 'PENDING' AND OrgId = '${OrgId}' AND IsActive = 1 ${storeIdCondition}
                                    ORDER BY 
                                        Id DESC;`;
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

router.get('/StoreDashboard', async (req, res) => {
    try {
        const { OrgId, UserId } = req.query;

    
        const results = await exeQuery.getStoresByUsers(OrgId, UserId);
        const StoreId = results[0].Stores; 

       
        let storeIdCondition = '';
        if (StoreId.includes(',')) {
            const storeIds = StoreId.split(',').map(id => `'${id}'`).join(',');
            storeIdCondition = `AND StoreId IN (${storeIds})`;
            console.log(storeIdCondition);
        } else {
            storeIdCondition = `AND StoreId = '${StoreId}'`;
        }

    
        const TotalProductsQuery = `SELECT COUNT(*) AS TotalProducts 
                                    FROM dbo.V_GetStoreProducts 
                                    WHERE OrgId = '${OrgId}' ${storeIdCondition}`;

        const PendingIndentsQuery = `SELECT COUNT(DISTINCT IndentNo) AS PendingIndents 
                                     FROM dbo.StockIndent 
                                     WHERE IndentStatus = 2  AND OrgId ='${OrgId}' AND IsActive = 1 ${storeIdCondition}`;

        const CompletedIndentsQuery = `SELECT COUNT(DISTINCT IndentNo) AS CompletedIndents 
                                       FROM dbo.StockIndent 
                                       WHERE IndentStatus = 5 AND OrgId ='${OrgId}'  AND IsActive = 1 ${storeIdCondition}`;

        const LowStockCountQuery = `SELECT COUNT(*) AS LowStock 
                                    FROM  dbo.V_GetStoreProducts 
                                    WHERE InStock <= LowStock AND OrgId = '${OrgId}'  ${storeIdCondition}`;

      
        const LowStockQuery = `SELECT TOP 4 ProductName, InStock 
                               FROM dbo.V_GetStoreProducts
                               WHERE InStock <= LowStock AND OrgId = '${OrgId}' ${storeIdCondition}`;

        const RecentIndentsQuery = `SELECT TOP 4 IndentNo, MAX(IndentDt) AS IndentDt, IndentStatus, StoreId, S.Name AS StoreName
                               FROM dbo.StockIndent SI
                               inner join dbo.Stores S ON S.Id = SI.StoreId
                               WHERE IndentStatus = 2 AND SI.OrgId = '${OrgId}' AND SI.IsActive = 1  ${storeIdCondition} 
                               GROUP BY IndentNo, IndentStatus, StoreId, S.Name
                               ORDER BY MAX(IndentDt) DESC`;

        const CompletedIndentsQueryDetails = `SELECT TOP 4 IndentNo, MAX(IndentDt) AS IndentDt, IndentStatus, StoreId, S.Name AS StoreName
                                               FROM dbo.StockIndent SI
                                               inner join dbo.Stores S ON S.Id = SI.StoreId
                                               WHERE IndentStatus = 5 AND SI.OrgId = '${OrgId}' AND SI.IsActive = 1  ${storeIdCondition} 
                                               GROUP BY IndentNo, IndentStatus, StoreId, S.Name
                                               ORDER BY MAX(IndentDt) DESC`;

        
        const [
            TotalProducts,
            PendingIndents,
            CompletedIndents,
            LowStockCount,
            LowStock,
            RecentIndents,
            CompletedIndentsDetails
        ] = await Promise.all([
            dbUtility.executeQuery(TotalProductsQuery),
            dbUtility.executeQuery(PendingIndentsQuery),
            dbUtility.executeQuery(CompletedIndentsQuery),
            dbUtility.executeQuery(LowStockCountQuery),
            dbUtility.executeQuery(LowStockQuery),
            dbUtility.executeQuery(RecentIndentsQuery),
            dbUtility.executeQuery(CompletedIndentsQueryDetails)
        ]);


        res.json({
            counts: {
                TotalProducts: TotalProducts[0].TotalProducts,
                PendingIndents: PendingIndents[0].PendingIndents,
                CompletedIndents: CompletedIndents[0].CompletedIndents,
                LowStock: LowStockCount[0].LowStock
            },
            LowStock, 
            RecentIndents, 
            CompletedIndents: CompletedIndentsDetails
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/SupplierDashboard', async (req, res) => {
    try {
        const { OrgId, SupplierId } = req.query;
        const DashboardCountsQuery = `
            SELECT 
                SUM(CASE WHEN SupplierId = ${SupplierId} THEN PaidAmount ELSE 0 END) AS PaidAmount,
                SUM(CASE WHEN SupplierId = ${SupplierId} THEN (InvoiceAmount - PaidAmount) ELSE 0 END) AS PendingAmt,
                COUNT(CASE WHEN SupplierId = ${SupplierId} THEN 1 ELSE NULL END) AS POcount,
                COUNT(CASE WHEN SupplierId = ${SupplierId} AND InvoiceStatus = 'PAID' THEN 1 ELSE NULL END) AS CompletedPOs
            FROM dbo.PurchaseTransaction
            WHERE OrgId = ${OrgId}
            AND IsActive = 1;
        `;
        const RecentPOsQuery = `
            SELECT TOP 5 * 
            FROM dbo.PurchaseTransaction
            WHERE POStatus = 'ORDER' 
            AND OrgId = ${OrgId} 
            AND IsActive = 1 
            AND SupplierId = ${SupplierId}
            ORDER BY Id DESC;
        `;
        const [
            DashboardCounts,
            RecentPOs
        ] = await Promise.all([
            dbUtility.executeQuery(DashboardCountsQuery),  
            dbUtility.executeQuery(RecentPOsQuery)       
        ]);
        res.json({
            DashboardCounts,
            RecentPOs
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/AccountsDashboard', async (req, res) => {
    try {
        const { OrgId, UserId } = req.query;
        const TotalStoresQuery = `SELECT COUNT(*) AS TotalStores  FROM dbo.UserStores  
        WHERE  OrgId = ${OrgId} and UserId = ${UserId} AND IsActive =1
        `;
        const PendingAMtQuery = `select SUM(InvoiceAmount - PaidAmount) AS PendingAmt from dbo.PurchaseTransaction PT 
        INNER JOIN dbo.UserStores US ON US.StoreId = PT.StoreId AND US.OrgId = PT.OrgId 
        where PT.OrgId = ${OrgId} AND UserId = ${UserId} AND PT.IsActive = 1
        `;
        const TotStockWorthCountQuery = `select SUM(Instock * Prices) AS StockWorthCount from dbo.StoreProducts SP
        INNER JOIN dbo.UserStores US ON US.StoreId = SP.StoreId AND US.OrgId = SP.OrgId 
        INNER JOIN dbo.Stores ST ON ST.Id = SP.StoreId
        where SP.OrgId = ${OrgId} AND UserId = ${UserId} AND US.IsActive = 1 AND SP.IsActive = 1`;

        const InvoiceAMtQuery = `select SUM(InvoiceAmount) AS Invoiceamt from dbo.PurchaseTransaction PT 
        INNER JOIN dbo.UserStores US ON US.StoreId = PT.StoreId AND US.OrgId = PT.OrgId 
        where PT.OrgId = ${OrgId} AND UserId = ${UserId} AND PT.IsActive = 1 AND
        PODate >= DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) - 1, 0)
        AND PODate < DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0);`;
        const TotalSTockWorthQuery = `select TOP 5 SUM(Instock * Prices) AS StockWorth, SP.StoreId, ST.Name AS StoreName from dbo.StoreProducts SP
        INNER JOIN dbo.UserStores US ON US.StoreId = SP.StoreId AND US.OrgId = SP.OrgId 
        INNER JOIN dbo.Stores ST ON ST.Id = SP.StoreId
        where SP.OrgId = ${OrgId} AND UserId =  ${UserId} AND US.IsActive = 1
        GROUP BY SP.StoreId, ST.Name`;
        const RecentPurchasesQuery = `select TOP 5 AutoGenTransactionNo, SupplierId, SU.SupplierName, EstimateAmount  from dbo.PurchaseTransaction PT 
        INNER JOIN dbo.Supplier SU ON SU.Id = PT.SupplierId
        INNER JOIN dbo.UserStores US ON US.StoreId = PT.StoreId AND US.OrgId = PT.OrgId 
        where POStatus = 'ORDER' AND PT.OrgId =  ${OrgId} AND estimateAmount IS NOT NULL 
        AND PT.IsActive = 1 AND UserId = ${UserId} AND US.IsActive = 1
        ORDER BY PT.Id DESC`;
        const TotalConsumedProductsQuery = `select TOP 5 COUNT(ProductId) AS ProductsCount, PR.Name AS ProductName,PR.AvgPrice,
        PT.StoreId from dbo.PurchaseTransactionDetails PTD 
        INNER JOIN dbo.Products PR ON PR.Id = PTD.ProductId 
        INNER JOIN dbo.PurchaseTransaction PT ON PT.Id = PTD.TransactionId
        INNER JOIN dbo.UserStores US ON US.StoreId = PT.StoreId AND US.OrgId = PT.OrgId 
        where PTD.OrgId = ${OrgId} AND PTD.ISActive = 1 AND UserId =  ${UserId} AND US.IsActive = 1
        GROUP by ProductId, PR.Name, PT.StoreId, PR.AvgPrice
        ORDER BY ProductsCount DESC`;

        const [
            TotalStores,
            PendingAMt,
            InvoiceAMt,
            TotalSTockWorth,
            RecentPurchases,
            TotalConsumedProducts,
            TotStockWorthCount


        ] = await Promise.all([
            dbUtility.executeQuery(TotalStoresQuery),  
            dbUtility.executeQuery(PendingAMtQuery),
            dbUtility.executeQuery(InvoiceAMtQuery),
            dbUtility.executeQuery(TotalSTockWorthQuery),
            dbUtility.executeQuery(RecentPurchasesQuery),
            dbUtility.executeQuery(TotalConsumedProductsQuery),  
            dbUtility.executeQuery(TotStockWorthCountQuery)   
        ]);
        res.json({
            TotalStores,
            PendingAMt,
            InvoiceAMt,
            TotalSTockWorth,
            RecentPurchases,
            TotalConsumedProducts,
            TotStockWorthCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;