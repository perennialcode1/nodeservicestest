use [db_ibizshop]
https://chat.openai.com/c/289334cb-f2e2-4c1d-9894-33baa18403e1
https://www.c-sharpcorner.com/article/how-to-pass-json-as-parameter-to-store-procedure/
select * from dbo.Customers where id = 95289
select * from dbo.SubCategories where id = 157
select * from dbo.Categories where id = 4246
select * from dbo.Operation
select * from dbo.Stores where Id = 180
select * from dbo.Expenses where Id = 80
--select * from dbo.UserStores where StoreId = 41
select * from dbo.Discounts where OrgId = 41028 and IsActive = 1
select * from dbo.Taxes
select * from dbo.Suppliers where id = 523
select * from dbo.TransferStock 
select * from [dbo].[MartInventory]
select * from [dbo].[PurchaseOrders]
select * from [dbo].[PaymentTypes]
select * from dbo.ScreenQuery where OperationId = 112
select * from dbo.Operation where Id = 11
GETS

insert into dbo.Operation (TableName,Text)
Values ('SupplierProducts','SUPRINSR'),
('SupplierProducts','SUPRUPDT'),
('SupplierProducts','SUPRGETS'),
('SupplierProducts','SUPRDELT')

select * from dbo.users

insert into dbo.ScreenQuery (OperationId,SqlQuery,IsActive)
values (40,
'select * from dbo.V_MartInventory where IsActive = @IsActive and StoreId = @StoreId'
,1)


INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES 
    (45, 'DELETE FROM dbo.PurchaseOrders WHERE Id = @Id', 1), -- Delete operation for Categories
    (29, 'DELETE FROM dbo.Taxes WHERE Id = @Id', 1) -- Delete operation for SubCategories
    (17, 'DELETE FROM dbo.Stores WHERE Id = @Id', 1); -- Delete operation for Stores


	SELECT       (SELECT COUNT(*) FROM dbo.Stores WHERE OrgId = @OrgId) AS TotalStores,
	SUM(CASE WHEN o.[OrderType] = 1 THEN o.Total ELSE 0 END) AS presentMonthSales, 
	SUM(CASE WHEN o.[OrderType] = 2 THEN o.Total ELSE 0 END) AS presentMonthRefunds, 
	SUM(CASE WHEN o.[OrderType] = 1 AND CONVERT(DATE, o.[Orderdate]) = CAST(GETDATE() AS DATE) 
	THEN o.Total ELSE 0 END) AS Todaysales,      SUM(CASE WHEN o.[OrderType] = 2 AND CONVERT(DATE, o.[Orderdate])
	= CAST(GETDATE() AS DATE) THEN o.Total ELSE 0 END) AS TodayRefunds 
	FROM       dbo.Orders o  WHERE       o.[IsActive] = 1      AND YEAR(o.[Orderdate]) = YEAR(GETDATE())  
	AND MONTH(o.[Orderdate]) = MONTH(GETDATE())      AND o.OrgId = @OrgId

	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (171,
'UPDATE [dbo].[SupplierProducts] SET
    [OrgId] = @OrgId, [SupplierId] = @SupplierId, [ProductId] = @ProductId, 
    [Notes] = @Notes, [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = GETDATE()
WHERE [Id] = @Id;', 1);
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (170,
'INSERT INTO [dbo].[SupplierProducts] (
    [OrgId], [SupplierId], [ProductId], [IsActive], 
    [CreatedBy], [CreatedOn]
) VALUES (
    @OrgId, @SupplierId, @ProductId, @IsActive, 
    @CreatedBy, GETDATE()
)', 1);


	/*
update dbo.ScreenQuery set SqlQuery =
'INSERT INTO [dbo].[Suppliers] (
    [OrgId], [SuplierName], [ContactName], [EmailId], 
    [PhoneNo], [Website], [AddressLine1], [AddressLine2], 
    [City], [StateOrProvince], [Country], [ZIPCode], 
    [Notes], [IsVender], [IsActive], [CreatedBy], 
    [CreatedOn],  [GSTN], 
    [IsIGST], [PayTermDays]
) VALUES (
    @OrgId, ''@SuplierName'', ''@ContactName'', ''@EmailId'', 
    ''@PhoneNo'', ''@Website'', ''@AddressLine1'', ''@AddressLine2'', 
    ''@City'', ''@StateOrProvince'', ''@Country'', ''@ZIPCode'', 
    ''@Notes'', @IsVender, @IsActive, @CreatedBy, 
    GETDATE(), ''@GSTN'', @IsIGST, @PayTermDays
)'
where OperationId = 30

update dbo.ScreenQuery set SqlQuery =
'UPDATE [dbo].[Suppliers] SET
    [OrgId] = @OrgId, [SuplierName] = ''@SuplierName'', [ContactName] = ''@ContactName'', 
    [EmailId] = ''@EmailId'', [PhoneNo] = ''@PhoneNo'', [Website] = ''@Website'', 
    [AddressLine1] = ''@AddressLine1'', [AddressLine2] = ''@AddressLine2'', 
    [City] = ''@City'', [StateOrProvince] = ''@StateOrProvince'', [Country] = ''@Country'', 
    [ZIPCode] = ''@ZIPCode'', [Notes] = ''@Notes'', [IsVender] = @IsVender, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = GETDATE(), [GSTN] = ''@GSTN'', 
    [IsIGST] = @IsIGST, [PayTermDays] = @PayTermDays
WHERE
    [Id] = @Id;
'
where OperationId = 31
	/*
	UPDATE dbo.ScreenQuery 
SET SqlQuery = '
	SELECT
    (SELECT COUNT(*) FROM dbo.Stores WHERE OrgId = @OrgId) AS TotalStores,
    SUM(CASE WHEN o.[OrderType] = 1 THEN o.Total ELSE 0 END) AS PresentMonthSales, 
    SUM(CASE WHEN o.[OrderType] = 2 THEN o.Total ELSE 0 END) AS PresentMonthRefunds, 
    SUM(CASE WHEN o.[OrderType] = 1 AND CONVERT(DATE, o.[Orderdate]) = CAST(GETDATE() AS DATE) THEN o.Total ELSE 0 END) AS TodaySales,
    SUM(CASE WHEN o.[OrderType] = 2 AND CONVERT(DATE, o.[Orderdate]) = CAST(GETDATE() AS DATE) THEN o.Total ELSE 0 END) AS TodayRefunds,
    (SELECT COUNT(*) FROM dbo.Customers WHERE OrgId = @OrgId AND IsActive = 1) AS TotalCustomers,
    (SELECT COUNT(*) FROM dbo.Suppliers WHERE OrgId = @OrgId AND IsActive = 1) AS TotalSuppliers,
    (SELECT COUNT(*) FROM dbo.PurchaseOrders WHERE OrgId = @OrgId AND IsActive = 1) AS TotalPurchaseOrders
FROM
    dbo.Orders o
WHERE
    o.[IsActive] = 1
    AND YEAR(o.[Orderdate]) = YEAR(GETDATE())
    AND MONTH(o.[Orderdate]) = MONTH(GETDATE())
    AND o.OrgId = @OrgId;'
where OperationId = 112
	/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (42,
'INSERT INTO [dbo].[PurchaseOrders] (
    [OrgId], [StoreId], [PoNumber], [SupplierId], 
    [PoDate], [ExpectedDate], [Notes], [Status], 
    [IsActive], [CreatedBy], [CreatedOn], [Total], 
    [SGST], [CGST], [IGST], [IsClientPO], 
    [CustomerId], [ReferenceNo]
) VALUES (
    @OrgId, @StoreId, ''@PoNumber'', @SupplierId, 
    CONVERT([date], ''@PoDate''), CONVERT([date], ''@ExpectedDate''), ''@Notes'', @Status, 
    1, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), NULL, 
    NULL, NULL, NULL, NULL, 
    NULL, ''@ReferenceNo''
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (43,
'UPDATE [dbo].[PurchaseOrders] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [PoNumber] = ''@PoNumber'', 
    [SupplierId] = @SupplierId, [PoDate] = CONVERT([date], ''@PoDate''), [ExpectedDate] = CONVERT([date], ''@ExpectedDate''), 
    [Notes] = ''@Notes'', [Status] = @Status, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [ReferenceNo] = ''@ReferenceNo''
WHERE
    [Id] = @Id;
', 1)

/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (16,
'INSERT INTO [dbo].[MartInventory] (
    [StoreId], [ProductId], [BatchNo], [Qunatity], 
    [ExpireDate], [Barcode], [Sold], [IsActive], 
    [CreatedBy], [CreatedOn], [MRP], [SalePrice], 
    [PurchasePrice], [HasPercentage], [DiscountValue]
) VALUES (
    @StoreId, @ProductId, ''@BatchNo'', @Qunatity, 
    CONVERT([datetime], ''@ExpireDate''), ''@Barcode'', 0, 1, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    @MRP, @SalePrice, @PurchasePrice, @HasPercentage, 
    @DiscountValue
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (39,
'UPDATE [dbo].[MartInventory] SET
    [StoreId] = @StoreId, [ProductId] = @ProductId, [BatchNo] = ''@BatchNo'', 
    [Qunatity] = @Qunatity, [ExpireDate] = CONVERT([datetime], ''@ExpireDate''), [Barcode] = ''@Barcode'', 
    [IsActive] = 1, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [MRP] = @MRP, 
    [SalePrice] = @SalePrice, [PurchasePrice] = @PurchasePrice, [HasPercentage] = @HasPercentage, 
    [DiscountValue] = @DiscountValue
WHERE
    [Id] = @Id;
', 1)

UPDATE dbo.ScreenQuery 
SET SqlQuery = 
'INSERT INTO [dbo].[MartInventory] (
    [OrgId], [StoreId], [ProductId], [BatchNo], [Qunatity], 
    [ExpireDate], [Barcode], [Sold], [IsActive], 
    [CreatedBy], [CreatedOn], [MRP], [SalePrice], 
    [PurchasePrice], [HasPercentage], [DiscountValue]
) VALUES (
    @OrgId, @StoreId, @ProductId, ''@BatchNo'', @Qunatity, 
    CONVERT([datetime], ''@ExpireDate''), ''@Barcode'', 0, 1, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    @MRP, @SalePrice, @PurchasePrice, @HasPercentage, 
    @DiscountValue
)'
WHERE id = 38;
/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (34,
'INSERT INTO [dbo].[TransferStock] (
    [OrgId], [TSRId], [FromStoreId], [ToStoreId], 
    [TransferDate], [Notes], [Status], [IsActive], 
    [CreatedBy], [CreatedOn],
    [TSNumber], [ReceivedDate]
) VALUES (
    @OrgId, @TSRId, @FromStoreId, @ToStoreId, 
    CONVERT([date], ''@TransferDate''), ''@Notes'', @Status, 1, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')),
    ''@TSNumber'', CONVERT([date], ''@ReceivedDate'')
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (35,
'UPDATE [dbo].[TransferStock] SET
    [OrgId] = @OrgId, [TSRId] = @TSRId, [FromStoreId] = @FromStoreId, 
    [ToStoreId] = @ToStoreId, [TransferDate] = CONVERT([date], ''@TransferDate''), [Notes] = ''@Notes'', 
    [Status] = @Status, [IsActive] = 1, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [TSNumber] = ''@TSNumber'', 
    [ReceivedDate] = CONVERT([date], ''@ReceivedDate'')
WHERE
    [Id] = @Id;
', 1)

insert into dbo.ScreenQuery (OperationId,SqlQuery,IsActive)
values (36,
'SELECT TS.Id AS TSId, TS.OrgId, TS.TSNumber AS TransferOrder, TS.TransferDate, TS.ReceivedDate,
       TS.FromStoreId, TS.ToStoreId, STO.Name AS FromStore, STOO.Name AS ToStore, TS.Status, TSD.Quantity
FROM [dbo].[TransferStock] AS TS
INNER JOIN TransferStockDetails AS TSD ON TSD.TSId = TS.Id
INNER JOIN dbo.stores AS STO ON STO.Id = TS.FromStoreId
INNER JOIN dbo.stores AS STOO ON STOO.Id = TS.ToStoreId
where TS.OrgId = @OrgId;
'
,1)

UPDATE dbo.ScreenQuery 
SET SqlQuery = 
'INSERT INTO [dbo].[TransferStock] (
    [OrgId], [TSRId], [FromStoreId], [ToStoreId], 
    [TransferDate], [Notes], [Status], [IsActive], 
    [CreatedBy], [CreatedOn],
    [TSNumber]
) VALUES (
    @OrgId, @TSRId, @FromStoreId, @ToStoreId, 
    CONVERT([date], ''@TransferDate''), ''@Notes'', @Status, 1, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    ''@TSNumber''
)'
WHERE id = 34;
/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (30,
'INSERT INTO [dbo].[Suppliers] (
    [OrgId], [SuplierName], [ContactName], [EmailId], 
    [PhoneNo], [Website], [AddressLine1], [AddressLine2], 
    [City], [StateOrProvince], [Country], [ZIPCode], 
    [Notes], [IsVender], [IsActive], [CreatedBy], 
    [CreatedOn], [UpdatedBy], [UpdatedOn], [GSTN], 
    [IsIGST]
) VALUES (
    @OrgId, ''@SuplierName'', ''@ContactName'', ''@EmailId'', 
    ''@PhoneNo'', ''@Website'', ''@AddressLine1'', ''@AddressLine2'', 
    ''@City'', ''@StateOrProvince'', ''@Country'', ''@ZIPCode'', 
    ''@Notes'', @IsVender, @IsActive, @CreatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @UpdatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), ''@GSTN'', 
    @IsIGST
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (31,
'UPDATE [dbo].[Suppliers] SET
    [OrgId] = @OrgId, [SuplierName] = ''@SuplierName'', [ContactName] = ''@ContactName'', 
    [EmailId] = ''@EmailId'', [PhoneNo] = ''@PhoneNo'', [Website] = ''@Website'', 
    [AddressLine1] = ''@AddressLine1'', [AddressLine2] = ''@AddressLine2'', 
    [City] = ''@City'', [StateOrProvince] = ''@StateOrProvince'', [Country] = ''@Country'', 
    [ZIPCode] = ''@ZIPCode'', [Notes] = ''@Notes'', [IsVender] = @IsVender, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [GSTN] = ''@GSTN'', 
    [IsIGST] = @IsIGST
WHERE
    [Id] = @Id;
', 1)


/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (26,
'INSERT INTO [dbo].[Taxes] (
    [OrgId], [TaxRate], [Description], [IsDefault], 
    [IsActive], [CreatedBy], [CreatedOn], 
    [SGSTRate], [CGSTRate], [IGSTRate]
) VALUES (
    @OrgId, @TaxRate, ''@Description'', @IsDefault, 
    @IsActive, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')),
	@SGSTRate, @CGSTRate, @IGSTRate
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (27,
'UPDATE [dbo].[Taxes] SET
    [OrgId] = @OrgId, [TaxRate] = @TaxRate, [Description] = ''@Description'', 
    [IsDefault] = @IsDefault, [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [SGSTRate] = @SGSTRate, 
    [CGSTRate] = @CGSTRate, [IGSTRate] = @IGSTRate
WHERE
    [Id] = @Id;
', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (22,
'INSERT INTO [dbo].[Discounts] (
    [OrgId], [StoreId], [Name], [Description], 
    [IsFixed], [Value], [Limit], [CreatedBy], 
    [CreatedOn], [UpdatedBy], [UpdatedOn], [IsActive]
) VALUES (
    @OrgId, @StoreId, ''@Name'', ''@Description'', 
    @IsFixed, @Value, @Limit, @CreatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @UpdatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @IsActive
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (23,
'UPDATE [dbo].[Discounts] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'', 
    [Description] = ''@Description'', [IsFixed] = @IsFixed, [Value] = @Value, 
    [Limit] = @Limit, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [IsActive] = @IsActive
WHERE
    [Id] = @Id;
', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (24,
'select * from dbo.Discounts where OrgId = @OrgId and IsActive = @IsActive
', 1)



INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (18,
'INSERT INTO [dbo].[Expenses] (
    [OrgId], [ExpenseTypeId], [DateOfTransaction], [Amount], 
    [ImagePath], [Quantity], [Note], [IsApproved], 
    [IsFixed], [IsActive], [CreatedBy], [CreatedOn], [StoreId]
) VALUES (
    @OrgId, @ExpenseTypeId, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @Amount, 
    ''@ImagePath'', @Quantity, ''@Note'', @IsApproved, 
    @IsFixed, @IsActive, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @StoreId
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (19,
'UPDATE [dbo].[Expenses] SET
    [OrgId] = @OrgId, [ExpenseTypeId] = @ExpenseTypeId, [DateOfTransaction] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [Amount] = @Amount, [ImagePath] = ''@ImagePath'', [Quantity] = @Quantity, [Note] = ''@Note'', 
    [IsApproved] = @IsApproved, [IsFixed] = @IsFixed, [IsActive] = @IsActive, 
    [UpdatedBy] = @UpdatedBy, [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [StoreId] = @StoreId
WHERE
    [Id] = @Id;
', 1)
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (20,
'SELECT st.Name AS Store, et.Name AS ExpenseType, e.Quantity, e.Amount, e.Note, e.IsApproved, e.DateOfTransaction
FROM dbo.expenses e
INNER JOIN dbo.ExpenseTypes et ON e.ExpenseTypeId = et.Id
INNER JOIN dbo.Stores st ON e.StoreId = st.Id
WHERE st.OrgId = @OrgId AND e.DateOfTransaction BETWEEN @StartDate AND @EndDate;',
1);

/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (6,
'INSERT INTO [dbo].[Categories] (
    [OrgId], [Name], [Description], [IsDefault], 
    [IsActive], [CreatedBy], [CreatedOn], [Code], 
    [ImagePath], [ImageUrl], [TakeAway], [Type]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsDefault, 
    @IsActive, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), ''@Code'', 
    ''@ImagePath'', ''@ImageUrl'', @TakeAway, ''@Type''
)', 1)



INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (7,
'UPDATE [dbo].[Categories] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'', 
    [IsDefault] = @IsDefault, [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [Code] = ''@Code'', 
    [ImagePath] = ''@ImagePath'', [ImageUrl] = ''@ImageUrl'', [TakeAway] = @TakeAway, [Type] = ''@Type''
WHERE
    [Id] = @Id;
', 1)






INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (10,
'INSERT INTO [dbo].[SubCategories] (
    [OrgId], [Name], [Description], [IsDefault], 
    [IsActive], [CreatedBy], [CreatedOn], [Code], 
    [Qty]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsDefault, 
    @IsActive, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), ''@Code'', 
    @Qty
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (11,
'UPDATE [dbo].[SubCategories] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'', 
    [IsDefault] = @IsDefault, [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [Code] = ''@Code'', 
    [Qty] = @Qty
WHERE
    [Id] = @Id;
', 1)



INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (14,
'INSERT INTO [dbo].[Stores] (
    [OrgId], [Name], [Address], [PhoneNo], 
    [Description], [DefaultTaxInclusive], [IsActive], [CreatedBy], 
    [CreatedOn], [IsMainStore], [GSTIN], [StoreNumber], 
    [BankDetails], [EmailId], [State], [City], 
    [GSTBillCode], [NonGSTBillCode], [StoreCode], [AddressLine2], 
    [AddressLine3]
) VALUES (
    @OrgId, ''@Name'', ''@Address'', ''@PhoneNo'', 
    ''@Description'', @DefaultTaxInclusive, @IsActive, @CreatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @IsMainStore, ''@GSTIN'', ''@StoreNumber'', 
    ''@BankDetails'', ''@EmailId'', ''@State'', ''@City'', 
    ''@GSTBillCode'', ''@NonGSTBillCode'', ''@StoreCode'', ''@AddressLine2'', 
    ''@AddressLine3''
)', 1)

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (15,
'UPDATE [dbo].[Stores] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Address] = ''@Address'', 
    [PhoneNo] = ''@PhoneNo'', [Description] = ''@Description'', [DefaultTaxInclusive] = @DefaultTaxInclusive, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [IsMainStore] = @IsMainStore, [GSTIN] = ''@GSTIN'', [StoreNumber] = ''@StoreNumber'', 
    [BankDetails] = ''@BankDetails'', [EmailId] = ''@EmailId'', [State] = ''@State'', 
    [City] = ''@City'', [GSTBillCode] = ''@GSTBillCode'', [NonGSTBillCode] = ''@NonGSTBillCode'', 
    [StoreCode] = ''@StoreCode'', [AddressLine2] = ''@AddressLine2'', [AddressLine3] = ''@AddressLine3''
WHERE
    [Id] = @Id;
', 1)*/






/*UPDATE dbo.ScreenQuery 
SET SqlQuery = 
'INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (14,
'INSERT INTO [dbo].[TransferStock] (
    [OrgId], [TSRId], [FromStoreId], [ToStoreId], 
    [TransferDate], [Notes], [Status], [IsActive], 
    [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn], 
    [TSNumber], [ReceivedDate]
) VALUES (
    @OrgId, @TSRId, @FromStoreId, @ToStoreId, 
    CONVERT([date], ''@TransferDate''), ''@Notes'', @Status, 1, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @UpdatedBy, NULL, 
    ''@TSNumber'', CONVERT([date], ''@ReceivedDate'')
)', 1)'
WHERE id = 34;
*/





