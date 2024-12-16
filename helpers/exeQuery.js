const dbUtility = require('../dbUtility');


class exeQuery {
    GetNotifyData(OrgId, callback) {
        const sqlQuery = `
            select top 20 * from NotifyMessages  where OrgId = '${OrgId}' and IsSent = 0
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    UpdateNotifyStatus(Id,StatusCode, callback){
        const sqlQuery = `
            UPDATE NotifyMessages SET IsSent=1,SentStatus = ${StatusCode},SentAt = GETDATE() WHERE Id = ${Id}
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    GetNamesforEmails(Id, TableName, Columns, callback) {
        const sqlQuery = `
            select ${Columns}  from ${TableName}  where Id = '${Id}'
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    getStoresByUsers(OrgId, UserId) {
        const sqlQuery = `SELECT STRING_AGG(StoreId, ',') AS Stores 
                          FROM dbo.UserStores
                          WHERE OrgId = '${OrgId}' AND UserId = '${UserId}'  AND IsActive = 1`;
    
        console.log(sqlQuery);
        return dbUtility.executeQuery(sqlQuery)
            .then(results => {
                if (results.length > 0) {
                    return results;
                } else {
                    throw new Error('No stores found for the user.');
                }
            });
    }
    GetRolesByUsers(OrgId, UserId, callback) {
        const sqlQuery = `
            select RO.Name AS RoleName from dbo.Users US 
            INNER JOIN dbo.Roles RO ON US.RoleId =  RO.Id
            where US.OrgId = '${OrgId}' AND US.Id = '${UserId}'
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    
    BrandsUpdtPath(BrandId, Updtpath, callback) {
        const sqlQuery = `
            update  dbo.Brands  set Filepath = '${Updtpath}' where Id = '${BrandId}'
        `;
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    ProductsUpdtPath(ProductId, Updtpath, callback) {
        const sqlQuery = `
            update  dbo.Products  set ImagePath = '${Updtpath}' where Id = '${ProductId}'
        `;
        dbUtility.executeQuery(sqlQuery).then(results => callback(null, results)) .catch(callback);
    }
    SpComboProducts(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('ProductComposites is undefined'));
        }
        const { OrgId, CreatedBy, ProductComposites } = TotJson;
        console.log(TotJson);
        const ProductCompositesJSON = JSON.stringify(ProductComposites);
        const sqlQuery = `
            EXEC [dbo].[SP_InsertProductComposites]
            @OrgId = '${OrgId}',
            @CreatedBy = '${CreatedBy}',
            @ProductComposites = N'${ProductCompositesJSON .replace(/'/g, "''")}'
        `;
        console.log('sqlQuery:', sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }    
    getNotificationTemplate(event, roleName, orgId, StoreId, callback) {
        const isStoreManager = roleName === 'StoreManager';
        const whereCon = isStoreManager ? 'US.Name' : 'RO.Name';
        //RoleId = 3 Storemanager
        const storeManagerQuery = `
            SELECT US.Name, USO.StoreId, USO.OrgId
            FROM dbo.UserStores USO
            INNER JOIN dbo.Users US ON US.Id = USO.UserId
            WHERE USO.StoreId = '${StoreId}' AND USO.OrgId = ${orgId} AND US.RoleId = 3`;
        console.log(storeManagerQuery);
        const generalQuery = (name, whereCon) => `
            SELECT US.RoleId, US.Id AS UserId, US.OrgId, RO.Name, US.Email, US.Mobile,
                   NT.EmailBody, NT.Subject, NT.HasAttachment, NT.WhatsAppBody,
                     (SELECT STRING_AGG(Email, ',') FROM dbo.Users WHERE OrgId = ${orgId} AND RoleId = 2) AS AdminMails
            FROM dbo.Users US
            INNER JOIN dbo.Roles RO ON RO.Id = US.RoleId
            CROSS APPLY (SELECT TOP 1 * FROM dbo.NotificationTemplate WHERE Event = '${event}') NT
            WHERE ${whereCon} = '${name}' AND US.OrgId = ${orgId}`;
        console.log(generalQuery);
        const query = isStoreManager ? storeManagerQuery : generalQuery(roleName, whereCon);
    
        dbUtility.executeQuery(query)
            .then(results => {
                if (isStoreManager && results.length > 0) {
                    roleName = results[0].Name;
                    return dbUtility.executeQuery(generalQuery(roleName, whereCon));
                }
                return results;
            })
            .then(results => callback(null, results))
            .catch(callback);
    }
    getProductsExcel(data, callback) {
        const sqlQuery = `select Id, ProductName AS ProductsName from dbo.V_GetStoreProducts 
        where OrgId = ${data.OrgId}  AND StoreId = ${data.StoreId}`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    getCategoriesAndUnitsExcel(data, callback) {
        const sqlQuery = `
	    SELECT COALESCE(c.Name, '') AS ListOfCategories, COALESCE(u.Name, '') AS ListOfUnits
        FROM 
    (SELECT Name, ROW_NUMBER() OVER (ORDER BY Name) AS RowNum FROM dbo.Categories WHERE OrgId = ${data.OrgId}) AS c
    FULL OUTER JOIN (SELECT Name, ROW_NUMBER() OVER (ORDER BY Name) AS RowNum  FROM dbo.Units WHERE OrgId IN (31113, ${data.OrgId})) AS u
    ON  c.RowNum = u.RowNum;`;
        //const sqlQuery = `select Id, Name AS ListOfCategories from dbo.Categories where OrgId = ${data.OrgId}`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    getProductsData(data, callback) {
        const sqlQuery = `
	    select Id, StoreId,  OrgId, ProductName, BarCode, Description, StorePrice AS AvgPrice,  ProductSKU,  MRP, InStock AS Quantity   
        from dbo.V_GetStoreProducts where OrgId = ${data.OrgId} AND StoreId = ${data.StoreId} AND IsActive =1 AND StoreProdActive=1`;
        //const sqlQuery = `select Id, Name AS ListOfCategories from dbo.Categories where OrgId = ${data.OrgId}`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    getCategoriesExcel(data, callback) {
        const sqlQuery = `select Id, Name AS ListOfCategories from dbo.Categories where OrgId = ${data.OrgId}`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    getCategoryIdByName(categoryName, callback) {
        const queryParam = `%${categoryName}%`;
        const sqlQuery = `SELECT Id FROM dbo.Categories WHERE Name LIKE '${queryParam}'`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    getUnitIdByName(UnitName, callback) {
        const queryParam = `%${UnitName}%`;
        const sqlQuery = `SELECT Id FROM dbo.Units WHERE Name LIKE '${queryParam}'`;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
 
    insertroles(roleData, callback) {
        const sqlQuery = `
            INSERT INTO [dbo].[Roles] ([Name], [Description], [CreatedBy], [OrgId]) 
            VALUES ('${roleData.Name}', '${roleData.Description}', ${roleData.CreatedBy}, ${roleData.OrgId});
            SELECT SCOPE_IDENTITY() AS insertId;
        `;

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
     //#region Menu
    GetMenu(JsonData, callback) {
        /*const sqlQuery = `
            SELECT *
        FROM V_RoleMenu
        WHERE RoleId = ${JsonData.RoleId} AND (OrgId = ${JsonData.OrgId} OR OrgId = 31113);
        `;*/
        const sqlQuery = `SELECT * FROM V_RoleMenu WHERE RoleId = ${JsonData.RoleId} AND OrgId = ${JsonData.OrgId} 
        AND EXISTS (SELECT 1 FROM RoleMenu WHERE OrgId =  ${JsonData.OrgId} AND RoleId = ${JsonData.RoleId})
        UNION ALL
        SELECT * FROM V_RoleMenu WHERE RoleId = ${JsonData.RoleId}  AND OrgId = 31113 
        AND NOT EXISTS (SELECT 1 FROM RoleMenu WHERE OrgId =  ${JsonData.OrgId} AND RoleId = ${JsonData.RoleId}) ORDER BY SortOrder;`;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    
    GetMenuNodes(results,callback){
        if (!results || results.length === 0) {
            return callback(new Error('no Results'));
        }
        const menuNodes = this.buildMenuHierarchy(results);
        // Output the menu Nodes as JSON
        callback(null, menuNodes);
    }
    
    // Function to build menu hierarchy supporting multiple sublevels
    buildMenuHierarchy(menuItems) {
        // Step 1: Lookup object for all menu items by their AppMenuId
        const menuLookup = {};
        menuItems.forEach(menu => {
        menuLookup[menu.AppMenuId] = { 
            AppMenuId: menu.AppMenuId, 
            ReportId: menu.ReportId,
            MenuName: menu.MenuName,
            MenuPath: menu.MenuPath,
            SubItems: [] };
        });
    
        // Step 2: Organize the items into the correct hierarchy
        const rootMenus = [];
    
        menuItems.forEach(menu => {
        if (menu.ParentId === 0) {
            // It's a root menu
            rootMenus.push(menuLookup[menu.AppMenuId]);
        } else {
            // It's a child, so add it to its parent's SubItems array
            if (menuLookup[menu.ParentId]) {
            menuLookup[menu.ParentId].SubItems.push(menuLookup[menu.AppMenuId]);
            }
        }
        });
        return rootMenus; // Return the structured menu hierarchy
    }
    
    // This is the older version hardcoded
    GetMenuItems(results, callback) {
        if (!results) {
            return callback(new Error('Results are undefined'));
        }
        //console.log(results);
        let MenuCategories = {
            Dashboard: {},
            Masters: {},
            Products: {},
            Purchases: {},
            //Sales: {},
            //Expenses: {},
            SalesReports: {},
            InventoryReports: {},
            StockReports: {}
        };

        results.forEach(item => {
            if (MenuCategories.hasOwnProperty(item.MenuName)) {
                console.log(item.MenuName);
                const AppmenuId = item.AppMenuId;

                let subItems = [];
                results.forEach(subItem => {
                    if (subItem.ParentId === AppmenuId) {
                        subItems.push(subItem);
                    }
                });
                if (subItems.length > 0) {
                    MenuCategories[item.MenuName] = {
                        items: subItems
                    };
                }
            }
        });

        callback(null, MenuCategories);
    }
    /*GetMenuItemsss(results, callback) {
        if (!results || results.length === 0) {
            return callback(new Error('Results are empty or undefined'));
        }
    
        // Step 1: Extract parent items
        let parentItems = [];
        let submenuMap = {}; // Map to keep track of submenus
    
        results.forEach(item => {
            // Check for parent items
            if (item.ParentId === 0) {
                parentItems.push({
                    AppMenuId: item.AppMenuId,
                    MenuName: item.MenuName,
                    SubItems: [] // Initialize empty sub-items
                });
                submenuMap[item.AppMenuId] = parentItems[parentItems.length - 1]; // Add to submenuMap
            }
        });
    
        // Step 2: Assign submenus to parent items
        results.forEach(item => {
            if (item.ParentId && submenuMap[item.ParentId]) {
                let subItem = {
                    AppMenuId: item.AppMenuId,
                    MenuName: item.MenuName,
                    submenu: [] // Initialize empty submenu
                };
                submenuMap[item.ParentId].SubItems.push(subItem);
                submenuMap[item.AppMenuId] = subItem; // Update submenuMap
            }
        });
    
        // Step 3: Assign reports to submenus
        results.forEach(item => {
            if (item.ReportId) {
                let submenu = submenuMap[item.ParentId] || submenuMap[item.AppMenuId];
                if (submenu) {
                    if (!submenu.submenu) {
                        submenu.submenu = [];
                    }
                    submenu.submenu.push({
                        ReportId: item.ReportId,
                        AppMenuId: item.AppMenuId, // Add AppMenuId
                        MenuName: item.MenuName // Add MenuName
                    });
                }
            }
        });
    
        callback(null, parentItems);
    }
    GetMenuItemss(results, callback) {
        if (!results || results.length === 0) {
            return callback(new Error('Results are empty or undefined'));
        }
    
       
        let parentItems = [];
        let submenuMap = {}; 
    
        results.forEach(item => {
   
            if (item.ParentId === 0) {
                parentItems.push({
                    AppMenuId: item.AppMenuId,
                    MenuName: item.MenuName,
                    SubItems: []
                });
                submenuMap[item.AppMenuId] = parentItems[parentItems.length - 1]; 
            }
        });
        console.log(parentItems);
        console.log(submenuMap);
   
        results.forEach(item => {
            if (item.ParentId && submenuMap[item.ParentId]) {
                console.log(submenuMap[item.ParentId]);
                let subItem = {
                    AppMenuId: item.AppMenuId,
                    MenuName: item.MenuName,
                    submenu: [] 
                };
                submenuMap[item.ParentId].SubItems.push(subItem);
                submenuMap[item.AppMenuId] = subItem; 
            }
        });
    
    
        results.forEach(item => {
            if (item.ReportId) {
                let submenu = submenuMap[item.ParentId] || submenuMap[item.AppMenuId];
                if (submenu) {
                    if (!submenu.submenu) {
                        submenu.submenu = [];
                    }
                    submenu.submenu.push({
                        ReportId: item.ReportId,
                        AppMenuId: item.AppMenuId, 
                        MenuName: item.MenuName 
                    });
                }
            }
        });
    
        callback(null, parentItems);
    }*/
    
       
        
    
    
    
    //#endregion Menu
    SpSetRoleSecurity(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('RoleSecurity is undefined'));
        }
        const { orgid, RoleId, MenuId, IsChecked, CanWrite, CanDelete, CanExport, userid } = TotJson;
        console.log(TotJson);

        const sqlQuery = `
            EXEC [dbo].[SP_SetRoleSecurity]
            @orgid = '${orgid}',
            @RoleId = '${RoleId}',
            @MenuId = '${MenuId}',
            @IsChecked = '${IsChecked}',
            @CanWrite = '${CanWrite}',
            @CanDelete = '${CanDelete}',
            @CanExport = '${CanExport}',
            @UpdatedBy = '${userid}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }






    Exec_SpIndents(StockIndentDatas, callback) {
        if (!StockIndentDatas) {
            return callback(new Error('StockIndent Data is undefined'));
        }

        const { StockIndent, ProductDetails } = StockIndentDatas;

        if (!StockIndent) {
            return callback(new Error('StockIndent is undefined'));
        }

        //const { OrgId, StoreId, IndentDt, Operation, UserId, IndentNo } = StockIndent;

        if (!ProductDetails || !Array.isArray(ProductDetails)) {
            return callback(new Error('ProductDetails is undefined or not an array'));
        }

        const stockIndentJSON = JSON.stringify(StockIndent);
        const productDetailsJSON = JSON.stringify(ProductDetails);

        const sqlQuery = `
            EXEC [dbo].[SP_RaiseIndent]
            @StockIndent = N'${stockIndentJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productDetailsJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);

    }
    SpStockTransfer(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseRequest is undefined'));
        }

        const { orgid, userid, Stocktransfer, productdetails } = TotJson;
        const StocktransferJSON = JSON.stringify(Stocktransfer);
        const productdetailsJSON = JSON.stringify(productdetails);

        const sqlQuery = `
            EXEC [dbo].[SP_StockTransfer]
            @orgid = '${orgid}',
            @userid = '${userid}',
            @Stocktransfer = N'${StocktransferJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productdetailsJSON.replace(/'/g, "''")}'
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpADDStockTransfer(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseRequest is undefined'));
        }

        const { orgid, userid, IndentStatus, Stocktransfer, productdetails } = TotJson;
        const StocktransferJSON = JSON.stringify(Stocktransfer);
        const productdetailsJSON = JSON.stringify(productdetails);

        const sqlQuery = `
            EXEC [dbo].[SP_STTransfer]
            @orgid = '${orgid}',
            @userid = '${userid}',
            @IndentStatus = '${IndentStatus}',
            @Stocktransfer = N'${StocktransferJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productdetailsJSON.replace(/'/g, "''")}'
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpAddPOToStock(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseInvoice is undefined'));
        }
        //EXEC [dbo].[Sp_AddPOToStock] @Poid = 1, @UserId = 37, @UpdateDt = '2024-06-19 10:30:00'
        const { Poid, UserId, UpdateDt } = TotJson;
        //const PurchaseInvoiceJSON = JSON.stringify(PurchaseInvoice);
        //const productDetailsJSON = JSON.stringify(productdetails);

        const sqlQuery = `
            EXEC [dbo].[Sp_AddPOToStock]
            @Poid = '${Poid}',
            @UserId = '${UserId}',
             @UpdateDt = '${UpdateDt}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpSuppliers(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('suppliers is undefined'));
        }
        const { orgid, userid, Supplier, bank } = TotJson;
        console.log(TotJson);
        const SupplierJSON = JSON.stringify(Supplier);
        const bankJSON = JSON.stringify(bank);

        const sqlQuery = `
            EXEC [dbo].[SP_Supplier]
            @orgid = '${orgid}',
            @Userid = '${userid}',
            @Supplier = N'${SupplierJSON.replace(/'/g, "''")}',
            @bank = N'${bankJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpCustomers(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Customers is undefined'));
        }
        const { orgid, userid, Customer, Address } = TotJson;
        console.log(TotJson);
        const CustomerJSON = JSON.stringify(Customer);
        const AddressJSON = JSON.stringify(Address);

        const sqlQuery = `
            EXEC [dbo].[SP_Customer]
            @orgid = '${orgid}',
            @Userid = '${userid}',
            @Customer = N'${CustomerJSON.replace(/'/g, "''")}',
            @Address = N'${AddressJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpPurchaseRequest(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseRequest is undefined'));
        }

        const { orgid, userid, purchaserequest, productdetails } = TotJson;
        const purchaserequestJSON = JSON.stringify(purchaserequest);
        const productDetailsJSON = JSON.stringify(productdetails);

        const sqlQuery = `
            EXEC [dbo].[SP_PurchaseRequest]
            @orgid = '${orgid}',
            @userid = '${userid}',
            @purchaserequest = N'${purchaserequestJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productDetailsJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpReceiveLocalSTock(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('No Data'));
        }

        const { OrgId, UserId, IndentNo, ProductsData } = TotJson;
        const jsonDataJSON = JSON.stringify(ProductsData);

        const sqlQuery = `
            EXEC [dbo].[SP_ReceiveStockIndent]
            @OrgId = '${OrgId}',
            @userId = '${UserId}',
            @IndentNo = '${IndentNo}',
            @jsonData = N'${jsonDataJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpPurchaseInvoice(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseInvoice is undefined'));
        }

        const { orgid, userid, PurchaseInvoice, productdetails } = TotJson;
        const PurchaseInvoiceJSON = JSON.stringify(PurchaseInvoice);
        const productDetailsJSON = JSON.stringify(productdetails);

        const sqlQuery = `
            EXEC [dbo].[SP_PurchaseInvoice]
            @orgid = '${orgid}',
            @userid = '${userid}',
            @PurchaseInvoice = N'${PurchaseInvoiceJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productDetailsJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpPurchaseOrder(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseOrder is undefined'));
        }

        const { orgid, userid, MainStoreId, PurchaseOrder, productdetails } = TotJson;
        
        const PurchaseOrderJSON = JSON.stringify(PurchaseOrder);
        const productDetailsJSON = JSON.stringify(productdetails);
        console.log(PurchaseOrderJSON);
        console.log(productDetailsJSON);
        console.log('Hi');
        const sqlQuery = `
            EXEC [dbo].[SP_PurchaseOrder]
            @orgid = '${orgid}',
            @userid = '${userid}',
            @MainStoreId = '${MainStoreId}',
            @PurchaseOrder = N'${PurchaseOrderJSON.replace(/'/g, "''")}',
            @ProductDetails = N'${productDetailsJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpPurchaseOrderSentToSsupplier(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('PurchaseOrder is undefined'));
        }

        const { OrgId, UserId, StoreId, RefId, supplierid } = TotJson;
               
        const sqlQuery = `
            EXEC [dbo].[SP_POSentToSupplier]
            @OrgId = '${OrgId}',
            @UserId = '${UserId}',
            @StoreId = '${StoreId}',
            @RefId = '${RefId}',
            @supplierid = '${supplierid}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpProduct(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('suppliers is undefined'));
        }
        const { orgid, userid, Product, StoreProduct, OperationType, ProductVariants } = TotJson;
        console.log(TotJson);
        const ProductJSON = JSON.stringify(Product);
        const StoreProductJSON = JSON.stringify(StoreProduct);
        const ProductVariantsJSON = JSON.stringify(ProductVariants);
        const sqlQuery = `
            EXEC [dbo].[SP_Product]
            @orgid = '${orgid}',
            @Userid = '${userid}',
            @Product = N'${ProductJSON.replace(/'/g, "''")}',
            @StoreProduct = N'${StoreProductJSON.replace(/'/g, "''")}',
            @OperationType = '${OperationType}',
            @ProductVariants = N'${ProductVariantsJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SPProductsFromExcel(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('ndefined'));
        }
        const {  JsonData, orgid, userid, StoreId } = TotJson;
        console.log(TotJson);
        const ProductJSON = JSON.stringify(JsonData);
        const sqlQuery = `
        EXEC [dbo].[SP_InsertProductsFromExcel]
            @orgid = ${orgid},
            @userid = ${userid},
            @StoreId = ${StoreId},
            @JsonData = N'${ProductJSON.replace(/'/g, "''")}'
    `;
        console.log('sqlQuery:', sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SPEDITProductsFromExcel(TotJson, callback) {
        console.log('HI');
        if (!TotJson) {
            return callback(new Error('ndefined'));
        }
        const {   JsonData, orgid, userid, StoreId } = TotJson;
        console.log(TotJson);
        const ProductJSON = JSON.stringify(JsonData);
        const sqlQuery = `
        EXEC [dbo].[SP_UpdateProductsFromExcel]
            @orgid = ${orgid},
            @userid = ${userid},
            @StoreId = ${StoreId},
            @JsonData = N'${ProductJSON.replace(/'/g, "''")}'
    `;
        console.log('sqlQuery:', sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    Exec_SpReport(rptJson, callback) {
        if (!rptJson) {
            return callback(new Error('Report Params is undefined'));
        }
        const { OrgId, UserId, ReportId, ReportCriteria } = rptJson;
        console.log(rptJson);
        const ReportJSON = JSON.stringify(ReportCriteria);
        const sqlQuery = `
            EXEC [dbo].[Sp_GenerateReport]
            @OrgId = '${OrgId}',
            @Userid = '${UserId}',
            @ReportId = '${ReportId}',
            @ReportCritieria = N'${ReportJSON.replace(/'/g, "''")}'
        `;

        console.log('sqlQuery:', sqlQuery);

        dbUtility.executeForMultipleDS(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }


    Execute_SP(data, OperationId, callback) {
        //console.log(data);
        const sqlQuery = `
        DECLARE @ResultMessage NVARCHAR(MAX);
        DECLARE @STATUS NVARCHAR(MAX); -- Corrected declaration
        EXEC [dbo].[SP_ScreenOperations]
            @OperationId = '${OperationId}',
            @JsonData = '${data}',
            @ResultMessage = @ResultMessage OUTPUT,
            @STATUS = @STATUS OUTPUT; -- Passing @STATUS as an output parameter
        SELECT @ResultMessage AS ResultMessage, @STATUS AS Status; -- Retrieving both output parameters
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }


    SpSaveOrderDetails(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Order details are undefined'));
        }
    
        const { orgid, userid, OrgType, BillNo, Order, OrderDetails, OrderAdditionalDetails, OrderPayments, StockHistory, StoreProducts } = TotJson;
        console.log(TotJson);
    
        const OrderJSON = JSON.stringify(Order);
        const OrderDetailsJSON = JSON.stringify(OrderDetails);
        const OrderAdditionalDetailsJSON = JSON.stringify(OrderAdditionalDetails);
        const OrderPaymentsJSON = JSON.stringify(OrderPayments);
        const StockHistoryJSON = JSON.stringify(StockHistory);
        const StoreProductsJSON = JSON.stringify(StoreProducts);
        const escapeJson = json => json.replace(/'/g, "''");
        const sqlQuery = `
            EXEC [dbo].[SP_SaveOrderDetails]
                @orgid = ${orgid},
                @userid = ${userid},
                @OrgType = ${OrgType},
                @BillNo = ${BillNo},
                @Order = N'${escapeJson(OrderJSON)}',
                @OrderDetails = N'${escapeJson(OrderDetailsJSON)}',
                @OrderAdditionalDetails = N'${escapeJson(OrderAdditionalDetailsJSON)}',
                @OrderPayments = N'${escapeJson(OrderPaymentsJSON)}',
                @StockHistory = N'${escapeJson(StockHistoryJSON)}',
                @StoreProducts = N'${escapeJson(StoreProductsJSON)}'
        `;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpRefundOrders(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Order details are undefined'));
        }
    
        const { orgid, userid, UpdtOrder, UpdtOrderDetails, Order, OrderDetails, OrderPayments, StockHistory, StoreProducts } = TotJson;
        console.log(TotJson);
        const UpdtOrderJSON = JSON.stringify(UpdtOrder);
        const UpdtOrderDetailsJSON  = JSON.stringify(UpdtOrderDetails);
        const OrderJSON = JSON.stringify(Order);
        const OrderDetailsJSON = JSON.stringify(OrderDetails);
        const OrderPaymentsJSON = JSON.stringify(OrderPayments);
        const StockHistoryJSON = JSON.stringify(StockHistory);
        const StoreProductsJSON = JSON.stringify(StoreProducts);
        const escapeJson = json => json.replace(/'/g, "''");
    
        const sqlQuery = `
            EXEC [dbo].[SP_RefundOrders]
                @orgid = ${orgid},
                @userid = ${userid},
                @UpdtOrder = N'${escapeJson(UpdtOrderJSON)}',
                @UpdtOrderDetails = N'${escapeJson(UpdtOrderDetailsJSON)}',
                @Order = N'${escapeJson(OrderJSON)}',
                @OrderDetails = N'${escapeJson(OrderDetailsJSON)}',
                @OrderPayments = N'${escapeJson(OrderPaymentsJSON)}',
                @StockHistory = N'${escapeJson(StockHistoryJSON)}',
                @StoreProducts = N'${escapeJson(StoreProductsJSON)}'
                
        `;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpPayPendingOrders(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Order details are undefined'));
        }
    
        const { orgid, userid, Status, OrderId,  OrderPayments } = TotJson;
        console.log(TotJson);
        const OrderPaymentsJSON = JSON.stringify(OrderPayments);
        const escapeJson = json => json.replace(/'/g, "''");
        const sqlQuery = `
            EXEC [dbo].[SP_PayPendingPayments]
                @orgid = ${orgid},
                @userid = ${userid},
                @Status = ${Status}, 
                OrderId = ${OrderId},
                @OrderPayments = N'${escapeJson(OrderPaymentsJSON)}'
                
        `;
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpSaveQuotaionDetails(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Quotation details are undefined'));
        }
    
        const { orgid, userid, Quotaion, QuotaionDetails } = TotJson;
        console.log(TotJson);
        const QuotaionJSON = JSON.stringify(Quotaion);
        const QuotaionDetailsJSON = JSON.stringify(QuotaionDetails);
        const escapeJson = json => json.replace(/'/g, "''");
        
        const sqlQuery = `
            EXEC [dbo].[SP_SaveQuotaionDetails]
                @orgid = ${orgid},
                @userid = ${userid},
                @Quotaion = N'${escapeJson(QuotaionJSON)}',
                @QuotaionDetails = N'${escapeJson(QuotaionDetailsJSON)}'
        `;
        
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }
    SpInsertInvetoryProducts(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('Product details are undefined'));
        }
    
        const { OrgId, ProductId, StoreId, VariantId, Quantity, Weight, BatchNo, MfgDate, ExpiryDate, CreatedBy } = TotJson;
    
        const sqlQuery = `
            EXEC [dbo].[sp_InsertProductInventory] 
                @OrgId = ${OrgId},
                @ProductId = ${ProductId},
                @StoreId = ${StoreId},
                @VariantId = ${VariantId},
                @Quantity = ${Quantity},
                @Weight = ${Weight},
                @BatchNo = '${BatchNo}',
                @IsActive = 1,
                @MfgDate = '${MfgDate}',
                @ExpiryDate = '${ExpiryDate}',
                @CreatedBy = ${CreatedBy},
                @UpdatedBy = NULL           
        `;
        dbUtility.executeQuery(sqlQuery)
        .then(results => {
            // Add Status: true to each result item
            const modifiedResults = results.map(item => ({
                ...item,
                Status: true
            }));
            callback(null, modifiedResults);
        })
        .catch(callback);
    }
}

module.exports = new exeQuery();



/*

insertpurchaseorder ,
utilityenumfile 
inventoryfile 
productservices 
dashboard serive counts
*/