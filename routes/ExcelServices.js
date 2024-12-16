const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const exeQuery = require('../helpers/exeQuery');
const notification = require('../helpers/notifications');
const dbUtility = require('../dbUtility');
const ExcelJS = require('exceljs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
router.use(express.json());

router.get('/download-excel', async (req, res) => {
    try {
        const { OrgId, StoreId } = req.query;
        const data = { OrgId, StoreId };
        exeQuery.getProductsExcel(data, (error, results) => {
            //console.log(results);
            if (error) {
                console.error('SQL error', error);
                return res.status(500).send('Error generating Excel file');
            }
            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Products');
            // Add column headers
            worksheet.columns = [
                { header: 'Product ID', key: 'Id', width: 10, hidden: true },
                { header: 'Product Name', key: 'ProductsName', width: 30 },
                { header: 'Quantity', key: 'Quantity', width: 30 },
                { header: 'Rate', key: 'Rate', width: 30 }
            ];
            worksheet.addRows(results);
            const idColumn = worksheet.getColumn('Id');
            idColumn.eachCell((cell, rowNumber) => {
                cell.protection = { locked: true };
            });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch((err) => {
                    console.error('Error writing Excel file', err);
                    res.status(500).send('Error generating Excel file');
                });
        });
    } catch (err) {
        console.error('SQL error', err);
      
    }
});

router.post('/Indentupload-excel', upload.single('file'), async (req, res) => {
    
    try {
        const  parsedStockIndent  = req.body;
        const { StoreName } = req.body;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet('Products');
        const StockIndent = [];
        StockIndent.push(parsedStockIndent);
        const ProductDetails = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1 && row.getCell(3).value > 0) { 
                ProductDetails.push({
                    IndentId: "0", 
                    ProductId: row.getCell(1).value,
                    Quantity: row.getCell(3).value
                });
            }
        });
        const StockIndentData = {
            StoreName:StoreName,
            StockIndent:  StockIndent,
            ProductDetails: ProductDetails
        };
        console.log(StockIndentData);
        exeQuery.Exec_SpIndents(StockIndentData, (error, results) => {
            if (error) {
                res.status(400).send({ error: error.message });
                return;
            }
            res.status(200).send(results);
           
        });
    } catch (err) {
        console.error('Error processing the Excel file:', err);
        res.status(500).send('Error processing the Excel file.');
    } finally {
        try {
            await unlink(req.file.path);
        } catch (err) {
            console.error('Error deleting the uploaded file:', err);
        }
    }
});

router.post('/POupload-excel', upload.single('file'), async (req, res) => {
    
    try {
        const  PurchaseOrder  = req.body;
        const { orgid, userid, MainStoreId, DiscountAmount, DiscountType } = req.body;
        console.log(orgid);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet('Products');
        const StockIndent = [];
        StockIndent.push(PurchaseOrder);
        const productdetails = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1 && row.getCell(3).value > 0) { 
                productdetails.push({
                    ProductId: row.getCell(1).value,
                    Quantity: row.getCell(3).value,
                    UnitPrice: row.getCell(4).value,
                    Comments: "",
                    EstimatePrice: 0,
                    CGSTRate: 0,
                    SGSTRate: 0,
                    IGSTRate: 0,
                    CGST: 0,
                    SGST: 0,
                    IGST: 0
                });
            }
        });   
        const PurchaseOrdersData = {
            orgid:orgid,
            userid:userid,
            MainStoreId:MainStoreId,
            PurchaseOrder: PurchaseOrder,
            productdetails: productdetails
        };
        console.log(PurchaseOrdersData);
        exeQuery.SpPurchaseOrder(PurchaseOrdersData, (error, results) => {
            if (error) {
                res.status(400).send({ error: error.message });
                return;
            }
            console.log(results);
            res.status(200).send(results);
        });
    } catch (err) {
        console.error('Error processing the Excel file:', err);
        res.status(500).send('Error processing the Excel file.');
    } finally {
        try {
            await unlink(req.file.path);
        } catch (err) {
            console.error('Error deleting the uploaded file:', err);
        }
    }
});


router.get('/Productdownload-excel', async (req, res) => {
    try {
        const { OrgId } = req.query;
        console.log(OrgId);
        const data = { OrgId };
        exeQuery.getCategoriesAndUnitsExcel(data, (error, results) => {
            //console.log(results);
            if (error) {
                console.error('SQL error', error);
                return res.status(500).send('Error generating Excel file');
            }
            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('AddProducts');
            // Add column headers
            worksheet.columns = [
                { header: 'ListOfCategories', key: 'ListOfCategories', width: 30 },
                { header: 'ListOfUnits', key: 'ListOfUnits', width: 30 },
                { header: 'Product Name', key: 'ProductsName', width: 30 },
                { header: 'Description', key: 'Description', width: 30 },
                { header: 'Price', key: 'Price', width: 20 },
                { header: 'CategoryName', key: 'CategoryName', width: 30 },
                { header: 'BarCode', key: 'BarCode', width: 30 },
                { header: 'SoldbyWeight', key: 'SoldbyWeight', width: 20 },
                { header: 'ProductSKU', key: 'ProductSKU', width: 30 },
                { header: 'HSN', key: 'HSN', width: 30 },
                { header: 'code', key: 'code', width: 20 },
                { header: 'MRP', key: 'MRP', width: 20 },
                { header: 'Units', key: 'Units', width: 20 },
                { header: 'Quantity', key: 'Quantity', width: 20 }
            ];
            worksheet.addRows(results);
            /*const idColumn = worksheet.getColumn('Id');
            idColumn.eachCell((cell, rowNumber) => {
                cell.protection = { locked: true };
            });*/
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=AddProducts.xlsx');
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch((err) => {
                    console.error('Error writing Excel file', err);
                    res.status(500).send('Error generating Excel file');
                });
        });
    } catch (err) {
        console.error('SQL error', err);
      
    }
});
/*
router.get('/Productdownload-excel', async (req, res) => {
    try {
        const { OrgId } = req.query;
        console.log(OrgId);
        const data = { OrgId };
        exeQuery.getCategoriesExcel(data, (error, results) => {
            //console.log(results);
            if (error) {
                console.error('SQL error', error);
                return res.status(500).send('Error generating Excel file');
            }
            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('AddProducts');
            // Add column headers
            worksheet.columns = [
                { header: 'Category ID', key: 'Id', width: 10, hidden: true },
                { header: 'ListOfCategories Available', key: 'ListOfCategories', width: 30 },
                { header: 'Product Name', key: 'ProductsName', width: 30 },
                { header: 'Description', key: 'Description', width: 30 },
                { header: 'AvgPrice', key: 'AvgPrice', width: 20 },
                { header: 'CategoryName', key: 'CategoryName', width: 30 },
                { header: 'BarCode', key: 'BarCode', width: 30 },
                { header: 'SoldbyWeight', key: 'SoldbyWeight', width: 20 },
                { header: 'ProductSKU', key: 'ProductSKU', width: 30 },
                { header: 'HSN', key: 'HSN', width: 30 },
                { header: 'code', key: 'code', width: 20 },
                { header: 'MRP', key: 'MRP', width: 20 }
            ];
            worksheet.addRows(results);
            const idColumn = worksheet.getColumn('Id');
            idColumn.eachCell((cell, rowNumber) => {
                cell.protection = { locked: true };
            });
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=AddProducts.xlsx');
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch((err) => {
                    console.error('Error writing Excel file', err);
                    res.status(500).send('Error generating Excel file');
                });
        });
    } catch (err) {
        console.error('SQL error', err);
      
    }
});
/*
router.post('/AddProductupload-excel', upload.single('file'), async (req, res) => {
    try {
        const { orgid, userid } = req.body;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet('AddProducts');
        //if excelsheet doesnt matches the expectedheaders then will get error as invalid headers
        const expectedHeaders = ['Category ID', 'ListOfCategories Available', 'Product Name', 'Description', 'AvgPrice', 'CategoryName', 'BarCode', 'SoldbyWeight', 'ProductSKU', 'HSN', 'code', 'MRP'];
        if (!expectedHeaders.every((header, i) => header === worksheet.getRow(1).values.slice(1)[i])) {
            return res.status(400).send('Invalid headers in the uploaded file');
        }
        const Products = [];
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const categoryName = row.getCell(6).value;
            if (categoryName) {
                const productData = {
                    OrgId: orgid, CategoryId: 0, SubCategoryId: row.getCell(2).value || 0, Name: row.getCell(3).value,
                    Description: row.getCell(4).value || "", AvgPrice: row.getCell(5).value || 0, BarCode: row.getCell(7).value || "",
                    SoldbyWeight: row.getCell(8).value || 0, ProductSKU: row.getCell(9).value || "", HSN: row.getCell(10).value || "",
                    code: row.getCell(11).value || "", MRP: row.getCell(12).value || 0, IsActive: true, CreatedBy: userid,
                    Weight: row.getCell(8).value || 0, PackingWeight: row.getCell(8).value || 0, SaleUnitId: 0, PurchaseUnitId: 0, BrandId: 0
                };
                await new Promise((resolve, reject) => {
                    exeQuery.getCategoryIdByName(categoryName, (err, results) => {
                        if (err) return reject(err);
                        if (results.length) productData.CategoryId = results[0].Id;
                        Products.push(productData);
                        resolve();
                    });
                });
            }
        }
        exeQuery.SPProductsFromExcel({ Product: Products }, (error, results) => {
            if (error) return res.status(400).send({ error: error.message });
            res.status(200).send(results);
        });
    } catch (err) {
        console.error('Error processing the Excel file:', err);
        res.status(500).send('Error processing the Excel file.');
    } finally {
        try { await unlink(req.file.path); } catch (err) { console.error('Error deleting the uploaded file:', err); }
    }
});*/



router.post('/AddProductupload-excel', upload.single('file'), async (req, res) => {
    try {
        const { orgid, userid, StoreId } = req.body;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet('AddProducts');

        // Validate headers
        const expectedHeaders = ['ListOfCategories', 'ListOfUnits', 'Product Name', 'Description', 'Price', 'CategoryName', 'BarCode', 'SoldbyWeight', 'ProductSKU', 'HSN', 'code', 'MRP', 'Units', 'Quantity'];
        if (!expectedHeaders.every((header, i) => header === worksheet.getRow(1).values.slice(1)[i])) {
            return res.status(400).send('Invalid headers in the uploaded file');
        }

        const Products = [];
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const categoryName = row.getCell(6).value;
            const unitName = row.getCell(13).value;

            if (categoryName) {
                const productData = {
                    CategoryId: 0, SaleUnitId: 0,
                    Name: row.getCell(3).value,
                    Description: row.getCell(4).value || "",
                    AvgPrice: row.getCell(5).value || 0,
                    BarCode: row.getCell(7).value || "",
                    SoldbyWeight: row.getCell(8).value || 0,
                    ProductSKU: row.getCell(9).value || "",
                    HSN: row.getCell(10).value || "",
                    code: row.getCell(11).value || "",
                    MRP: row.getCell(12).value || 0,
                    IsActive: true,
                    CreatedBy: userid,
                    Weight: row.getCell(8).value || 0,
                    PackingWeight: row.getCell(8).value || 0,
                    Units: row.getCell(13).value || "",
                    Prices: row.getCell(5).value || 0,
                    InStock: row.getCell(14).value || 0
                };

                // Fetch CategoryId and SaleUnitId asynchronously
                try {
                    const categoryResult = await new Promise((resolve, reject) => {
                        exeQuery.getCategoryIdByName(categoryName, (err, results) => {
                            if (err) return reject(err);
                            resolve(results);
                        });
                    });
                    if (categoryResult.length) productData.CategoryId = categoryResult[0].Id;

                    const unitResult = await new Promise((resolve, reject) => {
                        exeQuery.getUnitIdByName(unitName, (err, results) => {
                            if (err) return reject(err);
                            resolve(results);
                        });
                    });
                    if (unitResult.length) productData.SaleUnitId = unitResult[0].Id;

                    // Push the final productData after resolving both CategoryId and SaleUnitId
                    Products.push(productData);
                } catch (error) {
                    console.error('Error fetching CategoryId or SaleUnitId:', error);
                    return res.status(500).send('Error processing product data.');
                }
            }
        }

        // Prepare the object to send to the stored procedure
        const Product = {
            orgid: orgid,
            userid: userid,
            StoreId: StoreId, 
            JsonData: Products
        };
        console.log(Product);
        // Execute the stored procedure
        exeQuery.SPProductsFromExcel(Product, (error, results) => {
            if (error) {
                return res.status(400).send({ error: error.message });
            }
            res.status(200).send(results);
        });
    } catch (err) {
        console.error('Error processing the Excel file:', err);
        res.status(500).send('Error processing the Excel file.');
    } finally {
        // Delete the uploaded file after processing
        try {
            await unlink(req.file.path);
        } catch (err) {
            console.error('Error deleting the uploaded file:', err);
        }
    }
});



router.get('/UPDTProductdownload-excel', async (req, res) => {
    try {
        const { OrgId, StoreId } = req.query;
        const data = { OrgId, StoreId };

        exeQuery.getProductsData(data, (error, results) => {
            if (error) {
                console.error('SQL error', error);
                return res.status(500).send('Error generating Excel file');
            }
            if (results.length === 0) {
                return res.status(404).send('No products found for this selected Store');
            }

            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('EDITProducts');

            // Add column headers
            worksheet.columns = [
                { header: 'Product ID', key: 'Id', width: 10, hidden: true },
                { header: 'Product Name', key: 'ProductName', width: 30 },
                { header: 'Price', key: 'AvgPrice', width: 20 },
                { header: 'BarCode', key: 'BarCode', width: 30 },
                { header: 'ProductSKU', key: 'ProductSKU', width: 30 },
                { header: 'Code', key: 'Code', width: 20 },
                { header: 'MRP', key: 'MRP', width: 20 },
                { header: 'Quantity', key: 'Quantity', width: 20 }
            ];

            // Add rows to the worksheet
            worksheet.addRows(results);

            // Set headers for file download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=EDITProducts.xlsx');

            // Write the Excel file to the response
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch((err) => {
                    console.error('Error writing Excel file', err);
                    res.status(500).send('Error generating Excel file');
                });
        });
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Internal server error');
    }
});
router.post('/EditProductupload-excel', upload.single('file'), async (req, res) => {
    try {
        const { orgid, userid, StoreId } = req.body;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);

        // Check the number of worksheets
        if (workbook.worksheets.length === 0) {
            return res.status(400).send('No worksheets found in the uploaded file.');
        }

        const worksheet = workbook.getWorksheet('EDITProducts');
        if (!worksheet) {
            return res.status(400).send('Worksheet "EDItProducts" not found in the uploaded file.');
        }

        
        const expectedHeaders = [
            'Product ID', 
            'Product Name', 
            'Price', 
            'BarCode', 
            'ProductSKU', 
            'Code',
            'MRP', 
            'Quantity'
        ];
        const actualHeaders = worksheet.getRow(1).values.slice(1);
        console.log(actualHeaders);
        if (!expectedHeaders.every((header, i) => header === actualHeaders[i])) {
            return res.status(400).send('Invalid headers in the uploaded file');
        }
        
        const Products = [];
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            if (row.getCell(1).value) { 
                const productData = {
                    Id: row.getCell(1).value,
                    Name: row.getCell(2).value,
                    AvgPrice: row.getCell(3).value || 0,
                    BarCode: row.getCell(4).value || "",
                    ProductSKU: row.getCell(5).value || "",
                    Code: row.getCell(6).value || "",
                    MRP: row.getCell(7).value || 0,
                    InStock: row.getCell(8).value || 0
                };
                Products.push(productData);
            }
        }

        const Product = {
            orgid,
            userid,
            StoreId,
            JsonData: Products
        };
        console.log(Product);

        exeQuery.SPEDITProductsFromExcel(Product, (error, results) => {
            if (error) {
                return res.status(400).send({ error: error.message });
            }
            res.status(200).send(results);
        });
    } catch (err) {
       
        res.status(500).send('Error processing the Excel file.');
    } finally {
        try {
            await unlink(req.file.path);
        } catch (err) {
            console.error('Error deleting the uploaded file:', err);
        }
    }
});


module.exports = router;