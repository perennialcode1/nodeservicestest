const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const { Customer } = require('../Models/CustomerMdl');
const dbUtility = require('../dbUtility');
const exeQuery = require('../helpers/exeQuery');
const fs = require('fs');
const path = require('path');
const uploadtemp = require('../helpers/multerconfig'); // Import the multer configuration
const {ftpFile} = require('../helpers/uploadFiles');
// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const router = express.Router();

router.use(express.json());
router.post('/getTransferProducts', async (req, res) => {
    try {
        const StoreProductsData = req.body;
        const { StoreProducts } = require('../Models/StoreProductsMdl');
        const data = new StoreProducts(StoreProductsData);
        console.log(data);
        handleRecord(req, res, data, OperationEnums().STKTRFRGET);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting StoreProducts' });
    }
});

router.get('/get/:Id', (req, res) => {
    const { Id } = req.params;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().CUSTGETS);
});

//#region Brands
router.post('/InsertBrands', uploadtemp.single('file'), async (req, res) => {
    try {
        const BrandsData = req.body;
        const filePath = req.file.path;
        //const fileExtension = path.extname(req.file.originalname);
        const fileName = req.file.originalname;
        const jsonData = JSON.stringify(BrandsData);
        exeQuery.Execute_SP(jsonData, OperationEnums().BRANDINSRT, async (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error inserting Brands' });
            }
            const BrandId = results[0].BrandId;
            const newfilename = `${BrandId}_${fileName}`;
            let UpdtFilepath = `ibiz\\${BrandsData.OrgId}\\Brands\\${newfilename}`;
            try {
                const uploadResponse = await ftpFile(filePath, BrandsData.OrgId,'IBIZ','Brands', newfilename);
                console.log( uploadResponse);
            } catch (uploadError) {
                return res.status(500).json({ error: 'Error uploading image' });
            }
            exeQuery.BrandsUpdtPath(BrandId, UpdtFilepath, async (updateError, updateResults) => {
                if (updateError) {
                    return res.status(500).json({ error: 'Error updating brand path' });
                }
                res.status(200).json({ message: 'Brands inserted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting Brands' });
    }
});


router.get('/getBrands', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().BRANDLIST);
});


router.post('/UpdateBrands', async (req, res) => {
    try {
        const BrandsData = req.body; // Assuming req.body contains the Brands data
        console.log(BrandsData);
        const { Brands } = require('../Models/BrandsMdl.js');
        const data = new Brands(BrandsData); // Creating a new Brands instance
        handleRecord(req, res, data, OperationEnums().BRANDUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Brands' });
    }
});
/*
router.post('/UpdateBrands', uploadtemp.single('file'), async (req, res) => {
    try {
        const BrandsData = req.body;
        const filePath = req.file.path;
        //const fileExtension = path.extname(req.file.originalname);
        const fileName = req.file.originalname;
        const jsonData = JSON.stringify(BrandsData);
        exeQuery.Execute_SP(jsonData, OperationEnums().BRANDINSRT, async (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error inserting Brands' });
            }
            const BrandId = results[0].BrandId;
            const newfilename = `${BrandId}_${fileName}`;
            let UpdtFilepath = `ibiz\\${BrandsData.OrgId}\\Brands\\${newfilename}`;
            try {
                const uploadResponse = await ftpFile(filePath, BrandsData.OrgId,'IBIZ','Brands', newfilename);
                console.log( uploadResponse);
            } catch (uploadError) {
                return res.status(500).json({ error: 'Error uploading image' });
            }
            exeQuery.BrandsUpdtPath(BrandId, UpdtFilepath, async (updateError, updateResults) => {
                if (updateError) {
                    return res.status(500).json({ error: 'Error updating brand path' });
                }
                res.status(200).json({ message: 'Brands inserted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting Brands' });
    }
});*/
router.post('/DelBrands', (req, res) => {
    const { Id, UpdatedBy } = req.body;
    const data = { "Id": Id, "UpdatedBy": UpdatedBy };
    handleRecord(req, res, data, OperationEnums().BRANDDELT);
});
//#endregion Brands
//#region Categories
router.get('/getCategories', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().CATGRLIST);
});
router.get('/getCategoryById', (req, res) => {
    const {Id} = req.query;
    const data = { "Id": Id };
    handleRecord(req, res, data, OperationEnums().CATGRSELC);
});
router.post('/InsertCategories', async (req, res) => {
    try {
        const CategoriesData = req.body; // Assuming req.body contains the customer data
        const { Categories } = require('../Models/CategoriesMdl');
        const data = new Categories(CategoriesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().CATGRINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/UpdateCategories', async (req, res) => {
    try {
        const CategoriesData = req.body; // Assuming req.body contains the customer data
        const { Categories } = require('../Models/CategoriesMdl');
        const data = new Categories(CategoriesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().CATGRUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/DelCategories', (req, res) => {
    const { Id, UpdatedBy } = req.body;
    const data = { "Id": Id, "UpdatedBy": UpdatedBy };
    handleRecord(req, res, data, OperationEnums().CATGRDELT);
});
router.get('/GetCategoryItems', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETCATITEMS);
});
//#endregion

//#region SubCategories
router.get('/getSubCategories', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().SBCATLIST);
});
router.post('/InsertSubCategories', async (req, res) => {
    try {
        const SubCategoriesData = req.body; // Assuming req.body contains the customer data
        const { SubCategories } = require('../Models/SubCategoriesMdl');
        const data = new SubCategories(SubCategoriesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().SBCATINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/UpdateSubCategories', async (req, res) => {
    try {
        const SubCategoriesData = req.body; // Assuming req.body contains the customer data
        const { SubCategories } = require('../Models/SubCategoriesMdl');
        const data = new SubCategories(SubCategoriesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().SBCATUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/DelSubCategories', (req, res) => {
    const { Id, UpdatedBy } = req.body;
    const data = { "Id": Id, "UpdatedBy": UpdatedBy };
    handleRecord(req, res, data, OperationEnums().SBCATDELT);
});
//#endregion

//#region Products
router.post('/GetProducts', async (req, res) => {
    try {
        const data = req.body;  // Assuming req.body contains the Products data
        //const { Products } = require('../Models/ProductsMdl');
        //const data = new Products(ProductsData); // Creating a new Products instance
        //console.log(data);
        handleRecord(req, res, data, OperationEnums().PRODSELC);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting Products' });
    }
});

router.post('/InsertProducts', (req, res) => {
    const Product = req.body; 
     exeQuery.SpProduct(Product, (error, results) => {
        if (error) {
           res.status(400).send({ error: error.message });
          return;
       }
       res.status(200).send(results);
     });      
});
router.post('/UploadProductIMG', uploadtemp.single('file'), async (req, res) => {
    try {
        const {OrgId, ProductId } = req.body;
        const filePath = req.file.path;
        //const fileExtension = path.extname(req.file.originalname);
        const fileName = req.file.originalname;
        const newfilename = `${ProductId}_${fileName}`;
        let UpdtFilepath = `ibiz\\${OrgId}\\Products\\${newfilename}`;
        console.log(UpdtFilepath);
        try {
            const uploadResponse = await ftpFile(filePath, OrgId,'IBIZ','Products', newfilename);
            console.log( uploadResponse);
        } catch (uploadError) {
            return res.status(500).json({ error: 'Error uploading image' });
        }
        exeQuery.ProductsUpdtPath(ProductId, UpdtFilepath, async (updateError, updateResults) => {
            if (updateError) {
                return res.status(500).json({ error: 'Error updating Product path' });
            }
            res.status(200).json({ message: 'Product ImagePath Updated successfully' });
        });
            
        
    } catch (error) {
        res.status(500).json({ error: 'Error Updating' });
    }
});

router.post('/GetStoreProducts', async (req, res) => {
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
        handleRecord(req, res, data, OperationEnums().STRPRSELC);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching store products.' });
    }
});
router.post('/GetStoreProductsUser', async (req, res) => {
    try {
        const data = req.body;
        handleRecord(req, res, data, OperationEnums().STRPRSELC);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error' });
    }
});
//#endregion Products

//#region ComboProducts
router.get('/getComboDDl', (req, res) => {
    const { OrgId, IsCompositeItem } = req.query;
    const data = { "OrgId": OrgId, "IsCompositeItem": IsCompositeItem };
    handleRecord(req, res, data, OperationEnums().COMBODDL);
});
router.get('/getComboProduct', (req, res) => {
    const { OrgId } = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().PRDCMBGET);
});
router.get('/viewComboProducts', (req, res) => {
    const { OrgId, MainProductId } = req.query;
    const data = { "OrgId": OrgId, "MainProductId": MainProductId };
    console.log(data)
    handleRecord(req, res, data, OperationEnums().PRODCMBV);
});

router.post('/InsertComboProducts', (req, res) => {
    const Product = req.body; 
     exeQuery.SpComboProducts(Product, (error, results) => {
        if (error) {
           res.status(400).send({ error: error.message });
          return;
       }
       res.status(200).send(results);
     });      
});
//#endregion ComboProducts


router.post('/Insert', async (req, res) => {
    try {
        const customerData = req.body;
        const data = new Customer(customerData);
        handleRecord(req, res, data, OperationEnums().CUSTINSR);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer' });
    }
});





router.post("/AddProducts", (req, res) => {
    try {
        const productData = req.body; // Assuming req.body contains the Products data
        const data = new Products(productData); // Creating a new Products instance

        const sqlQuery = `
            INSERT INTO Products (
                OrgId, CategoryId, SubCategoryId, BarCode, Name, Description, AvgPrice,
                ImagePath, ImageUrl, TrackStock, IsCompositeItem, StoreWiseTaxes,
                IsActive, CreatedBy, UpdatedBy, SoldbyWeight, ProductSKU, HSN,
                Weight, PackingWeight, code, MRP, ManufacturedDate, ExpiredDate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.OrgId, data.CategoryId, data.SubCategoryId, data.BarCode, data.Name, data.Description, data.AvgPrice,
            data.ImagePath, data.ImageUrl, data.TrackStock, data.IsCompositeItem, data.StoreWiseTaxes,
            data.IsActive, data.CreatedBy, data.UpdatedBy, data.SoldbyWeight, data.ProductSKU, data.HSN,
            data.Weight, data.PackingWeight, data.code, data.MRP, data.ManufacturedDate, data.ExpiredDate
        ];

        console.log(sqlQuery, values);

        dbUtility.executeQuery(sqlQuery, values)
            .then(results => {
                res.status(201).json({ Status: true, insertedId: results.insertId });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ Status: false, Error: err.message });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Status: false, Error: err.message });
    }
});

router.post('/UpdateProducts', async (req, res) => {
    try {
        const ProductsData = req.body; // Assuming req.body contains the Products data
        const { Products } = require('../Models/ProductsMdl');
        const data = new Products(ProductsData); // Creating a new Products instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().PRODUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Products' });
    }
});

router.post('/InsertStoreProducts', async (req, res) => {
    try {
        const StoreProductsData = req.body; // Assuming req.body contains the StoreProducts data
        const { StoreProducts } = require('../Models/StoreProductsMdl');
        const data = new StoreProducts(StoreProductsData); // Creating a new StoreProducts instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().SPTSINSR);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting StoreProducts' });
    }
});

router.post('/UpdateStoreProducts', async (req, res) => {
    try {
        const StoreProductsData = req.body; // Assuming req.body contains the StoreProducts data
        const { StoreProducts } = require('../Models/StoreProductsMdl');
        const data = new StoreProducts(StoreProductsData); // Creating a new StoreProducts instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().SPTSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating StoreProducts' });
    }
});

router.get('/GetBarcodeType', (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().GETBCTYPE);
});

// Add more routes as needed...
module.exports = router;
