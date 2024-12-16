const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const exeQuery = require('../helpers/exeQuery');
const notification = require('../helpers/notifications');
const dbUtility = require('../dbUtility');

const router = express.Router();
router.use(express.json());

//#region StockIndent
// router.get('/getStockIndent', async (req, res) => {
//     const data = req.query;
//     handleRecord(req, res, data, OperationEnums().STKIDLIST);
// });
router.get('/getStockIndent', async (req, res) => {
    const data = req.query;
    if (data.IndentDt != 0) {
        data.IndentDt = `''${data.IndentDt}''`;
    } else {
        data.IndentDt = 'NULL';
    }
    handleRecord(req, res, data, OperationEnums().STKIDLIST);
});

router.get('/getApprovedIndent', (req, res) => {
    const { OrgId } = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().APRVDINDTLIST);
});
router.get('/getConsolidatedIndents', (req, res) => {
    const { OrgId } = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().GETCONSIND);
});
router.get('/getIndentList', (req, res) => {
    const { OrgId, IndentNo } = req.query;
    const data = { "OrgId": OrgId, "IndentNo": IndentNo };
    handleRecord(req, res, data, OperationEnums().INDENTLIST);
});
router.get('/getApprovedIndentByStore', (req, res) => {
    const { OrgId, StoreId } = req.query;
    const data = { "OrgId": OrgId, "StoreId": StoreId };
    handleRecord(req, res, data, OperationEnums().GETAPRINDTS);
});
router.post('/ReceiveLocalStock', (req, res) => {
    const data = req.body; 
    exeQuery.SpReceiveLocalSTock(data, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});

router.post('/InsertStockIndent', (req, res) => {
    const StockIndentData = req.body; 
    const {  StockIndent  } = req.body;
    const Operation = StockIndent[0].Operation;

    exeQuery.Exec_SpIndents(StockIndentData, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
       
    });      
});
router.post('/UpdateIndentStatus', async (req, res) => {
    const IndentStatusData = req.body;
    const { IndentStatus } = IndentStatusData;
    console.log(IndentStatusData);
    console.log(IndentStatus);
    const jsonData = JSON.stringify(IndentStatusData);
    exeQuery.Execute_SP(jsonData, OperationEnums().INDSTUSUPDT, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });     
});

router.post('/DelIndent', (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().deleteind);
});

//#endregion StockIndent

//#region Purchase Request
router.post('/DelPOProduct', (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().DELPOPRODUCT);
});
router.get('/getPurchaseRequest', (req, res) => {
    const {OrgId,UserId, RequestDate, PRStatus} = req.query;
    const data = { "OrgId": OrgId,"UserId": UserId, "RequestDate": RequestDate, "PRStatus": PRStatus };
    handleRecord(req, res, data, OperationEnums().PURCHREQ);
});
router.get('/GetPRByID', (req, res) => {
    const {PurchaseId,UserId} = req.query;
    const data = { "PurchaseId": PurchaseId,"UserId": UserId};
    handleRecord(req, res, data, OperationEnums().PRBYID);
});
router.post('/InsertPurchaseRequest', (req, res) => {
    const PurchaseRequest = req.body; 
    exeQuery.SpPurchaseRequest(PurchaseRequest, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
//#endregion PurchaseRequest
//#region Purchase Order (PO)
router.get('/getPO', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().PURCHORD);
});
router.get('/GetPOByID', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().POBYID);
});
router.post('/InsertPurchaseOrder', (req, res) => {
    const PurchaseOrdersData = req.body; 
    const { PurchaseOrder } = req.body;
    const { Status, POStatus } = PurchaseOrder;
    console.log(POStatus);
    exeQuery.SpPurchaseOrder(PurchaseOrdersData, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});

//#endregion Purchase Order (PO)
//#region PurchaseOrder Received
router.get('/GetPOReceivedByID', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().PORECEIVEBYID);
});
//#region Purchase Invoice (Inv)
router.post('/InsertPurchaseInvoice', (req, res) => {
    const PurchaseInvoice = req.body; 
    exeQuery.SpPurchaseInvoice(PurchaseInvoice, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        
        res.status(200).send(results);
    });      
});
router.get('/GetInvoices', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().INVOICEGET);
});
router.get('/PrintPurchaseInvoice', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().PRINTINVOICE);
});
//#endregion Purchase Invoice


//#region POpayments
router.post('/POpayments', async (req, res) => {
    try {
        const { PaidDate, InvoiceStatus, TotalPaidAmount, POId, CreatedBy  } = req.body; 
        const sqlQuery = `update dbo.PurchaseTransaction set PaidDate = '${PaidDate}',
         PaidAmount = ${TotalPaidAmount}, InvoiceStatus = '${InvoiceStatus}', UpdatedBy = ${CreatedBy},
         UpdatedOn = dbo.GetCurrentISTTime() where Id = ${POId}`;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery);
        const jsonData = JSON.stringify(req.body);
        exeQuery.Execute_SP(jsonData, OperationEnums().POPAYINSRT, (error, result) => {
            if (error) {
                console.error('Error executing :', error);
                return res.status(500).json({ error: 'Error executing ' });
            }
            res.status(200).json({ message: '', result });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/GetPOpayments', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().POPAYGET);
});
//#endregion POpayments
//#region Suppliers
router.get('/GetSupplierByEmailId', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().SUPBYEMAIL);
});
router.get('/GetSuppliers', (req, res) => {
    const { OrgId } = req.body; 
    //console.log(IsVendor);
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().SUPLRLIST);
});
router.get('/GetSupplierDetails', (req, res) => {
    const { OrgId, SupplierId } = req.query; 
    //console.log(IsVendor);
    const data = { "OrgId": OrgId, "SupplierId": SupplierId };
    handleRecord(req, res, data, OperationEnums().SUPDETAILS);
});
router.get('/GetSuppliers', (req, res) => {
    const { OrgId } = req.body; 
    //console.log(IsVendor);
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().SUPLRLIST);
});
router.get('/GetSuppliers/:OrgId', (req, res) => {
    const { OrgId } = req.params;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().SUPLRLIST);
});
router.post('/InsertSuppliers', (req, res) => {
    const SuppliersJSON = req.body; 
    console.log(SuppliersJSON)
    exeQuery.SpSuppliers(SuppliersJSON, (error, results) => {
        if (error) {
            res.status(200).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
router.get('/GetSupplierDetails', (req, res) => {
    const { OrgId, SupplierId } = req.query; 
    //console.log(IsVendor);
    const data = { "OrgId": OrgId, "SupplierId": SupplierId };
    handleRecord(req, res, data, OperationEnums().SUPDETAILS);
});
router.get('/GetSupplierPendingPaymnts', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().SUPPAYPEND);
});
router.get('/GetSupplierPaymntsVIEW', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().SUPPAYVIEW);
});

//#endregion Suppliers

//#region StockTransfer
/*
router.post('/InsertStockTransfer', (req, res) => {
    const StockTransferData = req.body; 
   
    exeQuery.SpStockTransfer(StockTransferData, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});*/
// router.post('/InsertStockTransfer', async (req, res) => {
//     const { Stocktransfer, productdetails, userid } = req.body;
//     const { FromStoreId, ToStoreId } = Stocktransfer[0];
//     const NotifyData = req.body;
//     try {
       
//         for (const detail of productdetails) {
//             const { ProductId, TransferQty } = detail;
//             const transferQty = Number(TransferQty); 
//             const FromStockQuery = `SELECT Instock FROM dbo.StoreProducts WHERE StoreId = '${FromStoreId}' AND ProductId = ${ProductId}`;
//             const [fromStock] = await dbUtility.executeQuery(FromStockQuery);
//             const ToStockQuery = `SELECT Instock FROM dbo.StoreProducts WHERE StoreId = '${ToStoreId}' AND ProductId = ${ProductId}`;
//             const [toStock] = await dbUtility.executeQuery(ToStockQuery);
//             const fromStockQty = Number(fromStock.Instock); 
//             const toStockQty = Number(toStock.Instock);    
//             if (fromStockQty < transferQty) {
//                 return res.status(400).send({ error: `Not enough stock` });
//             }
//             await dbUtility.executeQuery(`UPDATE dbo.StoreProducts SET Instock = ${fromStockQty - transferQty}, UpdatedBy = ${userid},
//          UpdatedOn = dbo.GetCurrentISTTime() WHERE StoreId = '${FromStoreId}' AND ProductId = ${ProductId}`);

//             await dbUtility.executeQuery(`UPDATE dbo.StoreProducts SET Instock = ${toStockQty + transferQty}, UpdatedBy = ${userid},
//          UpdatedOn = dbo.GetCurrentISTTime() WHERE StoreId = '${ToStoreId}' AND ProductId = ${ProductId}`);
//         }
//         exeQuery.SpStockTransfer(req.body, (error, results) => {
//             if (error) {
//                 res.status(400).send({ error: error.message });
//                 return;
//             }
//             console.log(results);
//             if (results != null) {
//                 notification.StockTransferNotify(NotifyData, (error, emailResults) => {
//                     if (error) {
//                         res.status(400).send({ error: error.message });
//                         return;
//                     }
//                 });
//             }
//             res.status(200).send(results);
//         });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });

router.post('/ADDStockTransfer', async (req, res) => {
    const { Stocktransfer, productdetails, userid } = req.body;
    const Status  = Stocktransfer[0].Status;
    const NotifyData = req.body;
    console.log(Status);
    try {
        exeQuery.SpADDStockTransfer(req.body, (error, results) => {
            if (error) {
                res.status(400).send({ error: error.message });
                return;
            }
            
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


router.get('/getStockTransferList', (req, res) => {
    //const { OrgId, UserId } = req.query;
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETSTCKLIST);
});
router.get('/getStockTransferById', (req, res) => {
    const { OrgId, TransactionId } = req.query;
    const data = { "OrgId": OrgId, 'TransactionId': TransactionId };
    handleRecord(req, res, data, OperationEnums().GETSTCKTRFRLIST);
});
router.get('/getStockTransferPdf', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().STOCKTRFPDF);
});
//#endregion StockTransfer

router.get('/getPurchaseOrdersView', (req, res) => {
    const {OrgId, Id} = req.query;
    const data = { "OrgId": OrgId, "Id": Id };
    handleRecord(req, res, data, OperationEnums().POVIGETS);
});
router.get('/GetPurchaseProductDetails', (req, res) => {
    const {OrgId, StoreId, ProductId} = req.query;
    const data = { "OrgId": OrgId, "StoreId": StoreId, "ProductId": ProductId };
    handleRecord(req, res, data, OperationEnums().FNPOGETS);
});
router.get('/getTransferStock', (req, res) => {
    const { OrgId } = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().TRANGETS);
});

router.get('/getPurchaseRequestDetails', (req, res) => {
    const {OrgId, TransactionId} = req.query;
    const data = { "OrgId": OrgId, "TransactionId":  TransactionId};
    handleRecord(req, res, data, OperationEnums().PURCUPDT);
});

router.get('/getExpiredItems', (req, res) => {
    //const {OrgId} = req.query;
    const data = { "OrgId": "0" };
    handleRecord(req, res, data, OperationEnums().EXPRGETS);
});




router.post('/DelSuppliers', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().SUPPDELT);
});
router.post('/DelTransferStock', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().TRANDELT);
});
router.post('/DelPurchaseOrders', (req, res) => {
    const { Id } = req.body;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().PURCDELT);
});

router.post('/InsertSupplierProducts', async (req, res) => {
    try {
        const SupplierProductsData = req.body; // Assuming req.body contains the supplier products data
        const { SupplierProducts } = require('../Models/SupplierProductsMdl');
        const data = new SupplierProducts(SupplierProductsData); // Creating a new SupplierProducts instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().SUPRINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating supplier product' });
    }
});

router.post('/UpdateTransferStockStatus', async (req, res) => {
    try {
        const TransferStockData = req.body; // Assuming req.body contains the customer data
        const { TransferStock } = require('../Models/TransferStockMdl');
        const data = new TransferStock(TransferStockData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().TSREUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});

router.post('/InsertPurchaseOrders', async (req, res) => {
    try {
        const PurchaseOrdersData = req.body; // Assuming req.body contains the customer data
        const { PurchaseOrders } = require('../Models/PurchaseOrdersMdl');
        const data = new PurchaseOrders(PurchaseOrdersData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PURCINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/getPurchaseOrders', async (req, res) => {
    try {
        const PurchaseOrdersData = req.body; // Assuming req.body contains the customer data
        const { PurchaseOrders } = require('../Models/PurchaseOrdersMdl');
        const data = new PurchaseOrders(PurchaseOrdersData); // Creating a new Customer instance
        console.log(data);
        if(data.Status == 'Status'){
            data.Status = 'po.Status'
        }
        handleRecord(req, res, data, OperationEnums().PURCGETS);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});

router.post('/UpdatePurchaseOrders', async (req, res) => {
    try {
        const PurchaseOrdersData = req.body; // Assuming req.body contains the customer data
        const { PurchaseOrders } = require('../Models/PurchaseOrdersMdl');
        const data = new PurchaseOrders(PurchaseOrdersData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PURCUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/InsertPurchaseOrderDetails', async (req, res) => {
    try {
        const PurchaseOrderDetailsData = req.body; // Assuming req.body contains the PurchaseOrderDetails data
        const { PurchaseOrderDetails } = require('../Models/PurchaseOrderDetailsMdl');
        const data = new PurchaseOrderDetails(PurchaseOrderDetailsData); // Creating a new PurchaseOrderDetails instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PODSINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting PurchaseOrderDetails' });
    }
});

router.post('/UpdatePurchaseOrderDetails', async (req, res) => {
    try {
        const PurchaseOrderDetailsData = req.body; // Assuming req.body contains the PurchaseOrderDetails data
        const { PurchaseOrderDetails } = require('../Models/PurchaseOrderDetailsMdl');
        const data = new PurchaseOrderDetails(PurchaseOrderDetailsData); // Creating a new PurchaseOrderDetails instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PODSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating PurchaseOrderDetails' });
    }
});

router.post('/InsertProductVariants', async (req, res) => {
    try {
        const ProductVariantsData = req.body; // Assuming req.body contains the ProductVariants data
        const { ProductVariants } = require('../Models/ProductVariantsMdl');
        const data = new ProductVariants(ProductVariantsData); // Creating a new ProductVariants instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PRVSINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting ProductVariants' });
    }
});

router.post('/InsertTransferStockDetails', async (req, res) => {
    try {
        const TransferStockDetailsData = req.body; // Assuming req.body contains the TransferStockDetails data
        const { TransferStockDetails } = require('../Models/TransferStockDetailsMdl');
        const data = new TransferStockDetails(TransferStockDetailsData); // Creating a new TransferStockDetails instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().TSDSINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting TransferStockDetails' });
    }
});

router.post('/UpdateTransferStockDetails', async (req, res) => {
    try {
        const TransferStockDetailsData = req.body; // Assuming req.body contains the TransferStockDetails data
        const { TransferStockDetails } = require('../Models/TransferStockDetailsMdl');
        const data = new TransferStockDetails(TransferStockDetailsData); // Creating a new TransferStockDetails instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().TSDSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating TransferStockDetails' });
    }
});

router.post('/UpdateStockIndent', async (req, res) => {
    try {
        const StockIndentData = req.body; // Assuming req.body contains the StockIndent data
        const { StockIndent } = require('../Models/StockIndentMdl');
        const data = new StockIndent(StockIndentData); // Creating a new StockIndent instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STINUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating StockIndent' });
    }
});
//region Late Indent Req
router.post('/InsertLateIndentReq', async (req, res) => {
    try {
        const data = req.body;
        handleRecord(req, res, data, OperationEnums().NEWLATEINDREQ);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating late indent request' });
    }
});

router.get('/GetLateIndentsReqs', (req, res) => {
    const data  = req.query;
    handleRecord(req, res, data, OperationEnums().GETLATEINDREQ);
});

router.post('/UpdateLateIndentReq', async (req, res) => {
    try {
        const data = req.body;
        handleRecord(req, res, data, OperationEnums().UPDLATEINDREQ);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updateing late indent request' });
    }
});

router.get('/GetSupStoreByPOId', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETSUPSTORDATA);
});
//#endregion Late Indent Req
router.post('/POSendToSupplier', (req, res) => {
    const PurchaseOrdersData = req.body; 
    exeQuery.SpPurchaseOrderSentToSsupplier(PurchaseOrdersData, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
router.get('/GetInventoryProducts', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETPRODINV);
});
router.post('/InsertInventoryProduct', (req, res) => {
    const TotJson = req.body; 
    // console.log('fun call', TotJson)
    exeQuery.SpInsertInvetoryProducts(TotJson, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });      
});
router.get('/GetDeliveryChallans', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETDELIVCHAL);
});

module.exports = router;