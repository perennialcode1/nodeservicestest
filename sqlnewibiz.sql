use [db_ibizshop]
https://chat.openai.com/c/289334cb-f2e2-4c1d-9894-33baa18403e1
https://www.c-sharpcorner.com/article/how-to-pass-json-as-parameter-to-store-procedure/
select * from dbo.Customers where id = 95289
select * from dbo.SubUnits where id = 157
select * from dbo.Units where id = 4246

select * from dbo.Stores where OrgId = 41028
select * from dbo.Expenses where Id = 80
select * from dbo.Discounts where OrgId = 41028 and IsActive = 1
select * from dbo.Taxes
select * from dbo.Suppliers where id = 523
select * from dbo.TransferStock 
select * from dbo.products
select * from [dbo].[MartInventory]
select * from [dbo].[PurchaseOrders]
select * from [dbo].[PaymentTypes]
select * from [dbo].[PosTerminals]
select * from dbo.StoreTables
select * from dbo.PriceLists
select * from dbo.[ExpenseTypes]
select * from dbo.[GroupProdDiscount]
select * from [dbo].[CustomerGroups]
select * from [dbo].[StoreProdDiscount]
select * from [dbo].[HoldOrders]
select * from [dbo].[Orders]
select * from dbo.CustBalance
select * from dbo.OrderDetails
select * from dbo.OrderPayments
select * FROM dbo.StockHistory
select * FROM [dbo].[Quotaions]
select * from dbo.KOTDetails
select * from [dbo].[OrderReprints]
select * from dbo.DiningOptions
select * from dbo.ScreenQuery where id = 74
select * from dbo.Units
select * from dbo.Brands where IsActive = @IsActive and OrgId =  @OrgId 
select * from dbo.Operation where Id = 112

select * from dbo.VariantTypes 
select * from dbo.ProductVariants
select * from dbo.SubCategories
select * from dbo.Products
select * from dbo.ScreenQuery where OperationId = 113
select * from dbo.  Stats_TopProducts where OrgId = 41028
DECLARE @OrgId INT = 41028;

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
    AND o.OrgId = @OrgId;


insert into dbo.Operation (TableName,Text)
Values ('DashboardCount2','DAGETS')
insert into dbo.Operation (TableName,Text)
Values ('ProductVariants','PRVSINSR'),
('ProductVariants','UNITUPDT'),
('ProductVariants','UNITGETS'),
('ProductVariants','UNITDELT')

update dbo.Operation set Text = 'EXTSINSR' where id = 62
update dbo.Operation set Text = 'EXTSUPDT' where id = 63
update dbo.Operation set Text = 'EXTSGETS' where id = 64
update dbo.Operation set Text = 'EXTSDELT' where id = 65
insert into dbo.ScreenQuery (OperationId,SqlQuery,IsActive)
values (149,
'SELECT *
FROM dbo.Products
WHERE ExpiredDate < CAST(GETDATE() AS DATE)
'
,1)
select * from dbo.Products 
update dbo.screenQuery set SqlQuery = 'select * from dbo.Units where IsActive = 1 and OrgId =  @OrgId'
where OperationId = 145

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES 
    (146, 'update dbo.Units set IsActive = 0  WHERE Id = @Id', 1), -- Delete operation for Units
    (29, 'DELETE FROM dbo.Taxes WHERE Id = @Id', 1) -- Delete operation for SubUnits
    (17, 'DELETE FROM dbo.Stores WHERE Id = @Id', 1); -- Delete operation for Stores


	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (150,
'INSERT INTO [dbo].[VariantTypes] (
    [Name], [Value], [Description], [Isactive], 
    [CreatedBy], [CreatedOn], [Calc]
) VALUES (
    ''@Name'', ''@Value'', ''@Description'', @Isactive, 
    @CreatedBy, GETDATE(), @Calc
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (151,
'UPDATE [dbo].[VariantTypes] SET
    [Name] = ''@Name'', [Value] = ''@Value'', [Description] = ''@Description'', 
    [Isactive] = @Isactive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = GETDATE(), [Calc] = @Calc
WHERE
    [Id] = @Id;', 1);

	/*
update dbo.screenquery set SqlQuery = 
'INSERT INTO [dbo].[Products] (
    [OrgId], [CategoryId], [SubCategoryId], [BarCode], 
    [Name], [Description], [AvgPrice], [ImagePath], 
    [ImageUrl], [TrackStock], [IsCompositeItem], [StoreWiseTaxes], 
    [IsActive], [CreatedBy], [CreatedOn],
    [SoldbyWeight], [ProductSKU], [HSN], 
    [Weight], [PackingWeight], [code], [MRP], 
    [ManufacturedDate], [ExpiredDate]
) VALUES (
    @OrgId, @CategoryId, @SubCategoryId, ''@BarCode'', 
    ''@Name'', ''@Description'', @AvgPrice, ''@ImagePath'', 
    ''@ImageUrl'', @TrackStock, @IsCompositeItem, @StoreWiseTaxes, 
    @IsActive, @CreatedBy,  CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')),
    @SoldbyWeight, ''@ProductSKU'', ''@HSN'', 
    @Weight, @PackingWeight, ''@code'', @MRP, 
    ''@ManufacturedDate'', ''@ExpiredDate''
)
SELECT SCOPE_IDENTITY() AS insertId
'
where OperationId = 129

update dbo.screenquery set SqlQuery = 
'UPDATE [dbo].[Products] SET
    [OrgId] = @OrgId, [CategoryId] = @CategoryId, [SubCategoryId] = @SubCategoryId, 
    [BarCode] = ''@BarCode'', [Name] = ''@Name'', [Description] = ''@Description'', 
    [AvgPrice] = @AvgPrice, [ImagePath] = ''@ImagePath'', [ImageUrl] = ''@ImageUrl'', 
    [TrackStock] = @TrackStock, [IsCompositeItem] = @IsCompositeItem, [StoreWiseTaxes] = @StoreWiseTaxes, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE(), 
    [SoldbyWeight] = @SoldbyWeight, [ProductSKU] = ''@ProductSKU'', [HSN] = ''@HSN'', 
    [Weight] = @Weight, [PackingWeight] = @PackingWeight, [code] = ''@code'', 
    [MRP] = @MRP, [ManufacturedDate] = ''@ManufacturedDate'', [ExpiredDate] = ''@ExpiredDate''
WHERE
    [Id] = @Id;
'
where OperationId = 130


	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (148,
'INSERT INTO [dbo].[ProductVariants] (
    [OrgId], [ProductId], [VariantTypeId], [Value], 
    [IsActive], [CreatedBy], [CreatedOn], [CalcVal]
) VALUES (
    @OrgId, @ProductId, @VariantTypeId, @Value, 
    @IsActive, @CreatedBy, GETDATE(), @CalcVal
)', 1);

	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (143,
'INSERT INTO [dbo].[Units] (
    [OrgId], [Unit], [ProductsCount], [IsActive], 
    [CreatedBy], [CreatedOn], [Code]
) VALUES (
    @OrgId, ''@Unit'', ''@ProductsCount'', @IsActive, 
    @CreatedBy, GETDATE(), ''@Code''
)', 1);


INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (144,
'UPDATE [dbo].[Units] SET
    [OrgId] = @OrgId, [Unit] = ''@Unit'', [ProductsCount] = ''@ProductsCount'',
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = GETDATE(),
    [Code] = ''@Code''
WHERE
    [Id] = @Id;
', 1);

	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (139,
'INSERT INTO [dbo].[Brands] (
    [OrgId], [Name], [Description], [IsDefault], 
    [IsActive], [CreatedBy], [CreatedOn], [Code], 
    [ImagePath], [ImageUrl], [TakeAway], [Type]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsDefault, 
    @IsActive, @CreatedBy, 
    GETDATE(), ''@Code'', 
    ''@ImagePath'', ''@ImageUrl'', @TakeAway, ''@Type''
)', 1);
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (140,
'UPDATE [dbo].[Brands] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'',
    [IsDefault] = @IsDefault, [IsActive] = @IsActive, 
    [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE(),
    [Code] = ''@Code'', [ImagePath] = ''@ImagePath'', [ImageUrl] = ''@ImageUrl'', 
    [TakeAway] = @TakeAway, [Type] = ''@Type''
WHERE
    [Id] = @Id;
', 1);

	/*

	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (115,
'INSERT INTO [dbo].[DiningOptions] (
    [OrgId], [StoreId], [Name], [Description], 
    [CreatedBy], [CreatedOn], 
    [IsActive], [IsDefault]
) VALUES (
    @OrgId, @StoreId, ''@Name'', ''@Description'', 
    @CreatedBy,  GETDATE(), 
    @IsActive, @IsDefault
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (116,
'UPDATE [dbo].[DiningOptions] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'', 
    [Description] = ''@Description'', [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] =  GETDATE(), 
    [IsActive] = @IsActive, [IsDefault] = @IsDefault
WHERE
    [Id] = @Id
', 1);

	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (114,
'INSERT INTO [dbo].[OrderReprints] (
    [OrderId], [ReprintTime], [Reason], 
    [CreatedBy], [CreatedOn], 
    [IsActive]
) VALUES (
    @OrderId,  GETDATE(), 
    ''@Reason'', @CreatedBy,  GETDATE(),
    @IsActive
)', 1);


	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (108,
'INSERT INTO [dbo].[KOTDetails] (
    [OrgId], [KOTId], [ProductId], [Quantity], 
    [Status], [CreatedBy], [CreatedOn],
    [IsActive], [IsComplement], [Comments], 
    [ExplicitPrice]
) VALUES (
    @OrgId, @KOTId, @ProductId, @Quantity, 
    @Status, @CreatedBy, GETDATE(),  
    @IsActive, @IsComplement, ''@Comments'', @ExplicitPrice
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (109,
'UPDATE [dbo].[KOTDetails] SET
    [OrgId] = @OrgId, [KOTId] = @KOTId, [ProductId] = @ProductId,
    [Quantity] = @Quantity, [Status] = @Status, [UpdatedBy] = @UpdatedBy,
    [UpdatedOn] = GETDATE(), 
    [IsActive] = @IsActive, [IsComplement] = @IsComplement, [Comments] = ''@Comments'',
    [ExplicitPrice] = @ExplicitPrice
WHERE
    [Id] = @Id;
', 1);


	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (104,
'INSERT INTO [dbo].[Quotaions] (
    [QuotaionNo], [PosId], [Total], [Discount], 
    [SGST], [CGST], [IGST], [Status], 
    [IsActive], [CreatedBy], [CreatedOn], 
    [OrgId], [StoreId], [Quotaiondate], [DiscountId], 
    [DiningId], [ReturnFromOrdId], [CustomerId], [PriceListId], 
    [ExpectedDelivery], [Notes], [AdvanceAmount]
) VALUES (
    ''@QuotaionNo'', @PosId, @Total, @Discount, 
    @SGST, @CGST, @IGST, @Status, 
    @IsActive, @CreatedBy, GETDATE(), 
    @OrgId, @StoreId, GETDATE(), @DiscountId, 
    @DiningId, @ReturnFromOrdId, @CustomerId, @PriceListId, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), ''@Notes'', @AdvanceAmount
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (45,
'UPDATE [dbo].[Quotaions] SET
    [QuotaionNo] = ''@QuotaionNo'', [PosId] = @PosId, [Total] = @Total, [Discount] = @Discount, 
    [SGST] = @SGST, [CGST] = @CGST, [IGST] = @IGST, [Status] = @Status, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [Quotaiondate] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [DiscountId] = @DiscountId, [DiningId] = @DiningId, [ReturnFromOrdId] = @ReturnFromOrdId, 
    [CustomerId] = @CustomerId, [PriceListId] = @PriceListId, [ExpectedDelivery] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [Notes] = ''@Notes'', [AdvanceAmount] = @AdvanceAmount
WHERE
    [Id] = @Id;
', 1);


	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (100,
'INSERT INTO [dbo].[StockHistory] (
    [OrgId], [ProductId], [StoreId], [StockEffectTypeId], 
    [StockAdjusted], [StockAfter], [OrderId], [PurchaseOrderId], 
    [TransfarStockId], [StockAdjustId], [IsActive], [CreatedBy], 
    [CreatedOn], [SupplierId], [MartInventoryId]
) VALUES (
    @OrgId, @ProductId, @StoreId, @StockEffectTypeId, 
    @StockAdjusted, @StockAfter, @OrderId, @PurchaseOrderId, 
    @TransfarStockId, @StockAdjustId, @IsActive, @CreatedBy, 
    GETDATE(), @SupplierId, @MartInventoryId
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (101,
'UPDATE [dbo].[StockHistory] SET
    [OrgId] = @OrgId, [ProductId] = @ProductId, [StoreId] = @StoreId,
    [StockEffectTypeId] = @StockEffectTypeId, [StockAdjusted] = @StockAdjusted, 
    [StockAfter] = @StockAfter, [OrderId] = @OrderId, [PurchaseOrderId] = @PurchaseOrderId, 
    [TransfarStockId] = @TransfarStockId, [StockAdjustId] = @StockAdjustId, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = GETDATE(),
    [SupplierId] = @SupplierId, [MartInventoryId] = @MartInventoryId
WHERE
    [Id] = @Id;
', 1);

	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (96,
'INSERT INTO [dbo].[OrderPayments] (
    [OrgId], [OrderId], [PaymentTypeId], [PaidAmount], 
    [CardNo], [MobileNo], [CreatedBy], [CreatedOn]
) VALUES (
    @OrgId, @OrderId, @PaymentTypeId, @PaidAmount, 
    ''@CardNo'', ''@MobileNo'', @CreatedBy, 
    GETDATE()
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (97,
'UPDATE [dbo].[OrderPayments] SET
    [OrgId] = @OrgId, [OrderId] = @OrderId, [PaymentTypeId] = @PaymentTypeId,
    [PaidAmount] = @PaidAmount, [CardNo] = ''@CardNo'', [MobileNo] = ''@MobileNo'',
    [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
', 1);


	/*

	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (92,
'INSERT INTO [dbo].[OrderDetails] (
    [OrgId], [OrderId], [ProductId], [Quantity], [UnitPrice], [Discount], 
    [SGSTS], [CGSTS], [IGSTS], [Total], [Status], [RefundQuantity], [IsActive], [CreatedBy], 
    [CreatedOn], [VendorId], [IsComplement], [CGSTrate], [SGSTrate], [IGSTrate], 
    [NoOfBags], [Comments], [ItemWeight], [ItemPackingWeight], [BilledBarCode]
) VALUES (
    @OrgId, @OrderId, @ProductId, @Quantity, @UnitPrice, @Discount, 
    @SGSTS, @CGSTS, @IGSTS, @Total, @Status, @RefundQuantity, 1, @CreatedBy, 
    GETDATE(), 
    @VendorId, @IsComplement, @CGSTrate, @SGSTrate, @IGSTrate, 
    @NoOfBags, ''@Comments'', @ItemWeight, @ItemPackingWeight, ''@BilledBarCode''
)', 1);

   INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (93,
'UPDATE [dbo].[OrderDetails] SET [OrderId] = @OrderId, [ProductId] = @ProductId,
    [Quantity] = @Quantity, [UnitPrice] = @UnitPrice, [Discount] = @Discount, 
    [SGSTS] = @SGSTS, [CGSTS] = @CGSTS, [IGSTS] = @IGSTS, [Total] = @Total, 
    [Status] = @Status, [RefundQuantity] = @RefundQuantity, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE(),
    [VendorId] = @VendorId, [IsComplement] = @IsComplement, [CGSTrate] = @CGSTrate, 
    [SGSTrate] = @SGSTrate, [IGSTrate] = @IGSTrate, [NoOfBags] = @NoOfBags, 
    [Comments] = ''@Comments'', [ItemWeight] = @ItemWeight, [ItemPackingWeight] = @ItemPackingWeight, 
    [BilledBarCode] = ''@BilledBarCode''
WHERE
    [Id] = @Id;
', 1);


	/*

	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (88,
'INSERT INTO [dbo].[CustBalance] (
    [CustId], [Amount], [LastRechargeId], [LastOrderId], [IsActive], 
    [CreatedBy], [CreatedOn], [OrgId]
) VALUES (
    @CustId, @Amount, @LastRechargeId, @LastOrderId, 1, 
    @CreatedBy, GETDATE(), @OrgId
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (89,
'UPDATE [dbo].[CustBalance] SET [CustId] = @CustId, 
    [Amount] = @Amount, [LastRechargeId] = @LastRechargeId, [LastOrderId] = @LastOrderId, 
    [UpdatedBy] = @UpdatedBy,  [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
', 1);

	/*
	 [UpdatedOn] = GETDATE(), 
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (84,
'INSERT INTO [dbo].[Orders] (
    [OrderNo], [PosId], [OrderType], [Total], [Discount], 
    [SGST], [CGST], [IGST], [Status], [IsActive], 
    [CreatedBy], [CreatedOn], [OrgId], [StoreId], 
    [Orderdate], [DiscountId], [DiningId], [ReturnFromOrdId], 
    [CustomerId], [PriceListId], [TransportMode], [TransportvehicleNumber], 
    [AdditionalCharges], [AdditionalRoundOffAmount], [IsAcknowledge], [TransportAmount], 
    [InvoiceNo], [EmpId]
) VALUES (
    ''@OrderNo'', @PosId, @OrderType, @Total, @Discount, 
    @SGST, @CGST, @IGST, @Status, 1, 
    @CreatedBy, GETDATE(), @OrgId, @StoreId, 
    CONVERT([datetime], ''@Orderdate''), @DiscountId, @DiningId, @ReturnFromOrdId, 
    @CustomerId, @PriceListId, ''@TransportMode'', ''@TransportvehicleNumber'', 
    @AdditionalCharges, @AdditionalRoundOffAmount, @IsAcknowledge, @TransportAmount, 
    ''@InvoiceNo'', @EmpId
)', 1);


INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (85,
'UPDATE [dbo].[Orders] SET
    [OrderNo] = ''@OrderNo'', [PosId] = @PosId, [OrderType] = @OrderType, [Total] = @Total, [Discount] = @Discount, 
    [SGST] = @SGST, [CGST] = @CGST, [IGST] = @IGST, [Status] = @Status, 
    [UpdatedBy] = @UpdatedBy, GETDATE(),
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Orderdate] = CONVERT([datetime], ''@Orderdate''), [DiscountId] = @DiscountId, 
    [DiningId] = @DiningId, [ReturnFromOrdId] = @ReturnFromOrdId, [CustomerId] = @CustomerId, 
    [PriceListId] = @PriceListId, [TransportMode] = ''@TransportMode'', [TransportvehicleNumber] = ''@TransportvehicleNumber'', 
    [AdditionalCharges] = @AdditionalCharges, [AdditionalRoundOffAmount] = @AdditionalRoundOffAmount, 
    [IsAcknowledge] = @IsAcknowledge, [TransportAmount] = @TransportAmount, [InvoiceNo] = ''@InvoiceNo'', 
    [EmpId] = @EmpId
WHERE
    [Id] = @Id;
', 1);

	/*
	-- SQL Query for inserting into ScreenQuery table
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (80,
'INSERT INTO [dbo].[HoldOrders] (
    [OrgId], [StoreId], [PosId], [DiningId], 
    [HoldType], [TableId], [HoldName], [DiscountId], 
    [OrderTotal], [Status], [CreatedBy], [CreatedOn], 
     [IsActive], [CustomerId], 
    [PriceListId]
) VALUES (
    @OrgId, @StoreId, @PosId, @DiningId, 
    @HoldType, @TableId, @HoldName, @DiscountId, 
    @OrderTotal, @Status, @CreatedBy, GETDATE(), 
    @IsActive, @CustomerId, 
    @PriceListId
)', 1);

-- SQL Query for updating HoldOrders
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (81,
'UPDATE [dbo].[HoldOrders] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [PosId] = @PosId, [DiningId] = @DiningId, 
    [HoldType] = @HoldType, [TableId] = @TableId, [HoldName] = @HoldName, [DiscountId] = @DiscountId, 
    [OrderTotal] = @OrderTotal, [Status] = @Status, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE(), 
    [IsActive] = @IsActive, [CustomerId] = @CustomerId, [PriceListId] = @PriceListId
WHERE
    [Id] = @Id;
', 1);


	/*
	-- SQL Query for inserting into ScreenQuery table
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (76,
'INSERT INTO [dbo].[StoreProdDiscount] (
    [Name], [OrgId], [StoreId], [ProductId], 
    [Quantity], [FromDate], [ToDate], [IsPercentage], 
    [MaxDiscountValue], [MinProductValue], [Value], [IsActive], 
    [CreatedBy], [CreatdOn]
) VALUES (
    ''@Name'', @OrgId, @StoreId, @ProductId, 
    @Quantity, @FromDate, @ToDate, @IsPercentage, 
    @MaxDiscountValue, @MinProductValue, @Value, @IsActive, 
    @CreatedBy, GETDATE()
)', 1);


-- SQL Query for updating StoreProdDiscount
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (77,
'UPDATE [dbo].[StoreProdDiscount] SET
    [Name] = ''@Name'', [OrgId] = @OrgId, [StoreId] = @StoreId, [ProductId] = @ProductId, 
    [Quantity] = @Quantity, [FromDate] = @FromDate, [ToDate] = @ToDate, [IsPercentage] = @IsPercentage, 
    [MaxDiscountValue] = @MaxDiscountValue, [MinProductValue] = @MinProductValue, [Value] = @Value, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
', 1);

	/*
	-- SQL Query for inserting into ScreenQuery table
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (72,
'INSERT INTO [dbo].[CustomerGroups] (
    [OrgId], [StoreId], [Name], [IsActive], 
    [CreatedBy], [CreatedOn]
) VALUES (
    @OrgId, @StoreId, ''@Name'', @IsActive, 
    @CreatedBy, GETDATE()
)', 1);

-- SQL Query for updating CustomerGroups
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (73,
'UPDATE [dbo].[CustomerGroups] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'', 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
', 1);


	/*
	-- SQL Query for inserting into ScreenQuery table
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (68,
'INSERT INTO [dbo].[GroupProdDiscount] (
    [OrgId], [Name], [StoreId], [ProductId], 
    [CustGroupId], [FromDate], [ToDate], [IsPercentage], 
    [MaxDiscountValue], [MinProductValue], [Value], [Quantity], 
    [IsActive], [CreatedBy], [CreatdOn]
) VALUES (
    @OrgId, ''@Name'', @StoreId, @ProductId, 
    @CustGroupId, @FromDate, @ToDate, @IsPercentage, 
    @MaxDiscountValue, @MinProductValue, @Value, @Quantity, 
    @IsActive, @CreatedBy, GETDATE()
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (69,
'UPDATE [dbo].[GroupProdDiscount] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [StoreId] = @StoreId, [ProductId] = @ProductId, 
    [CustGroupId] = @CustGroupId, [FromDate] = @FromDate, [ToDate] = @ToDate, [IsPercentage] = @IsPercentage, 
    [MaxDiscountValue] = @MaxDiscountValue, [MinProductValue] = @MinProductValue, [Value] = @Value, [Quantity] = @Quantity, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
', 1);
	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (62,
'INSERT INTO [dbo].[ExpenseTypes] (
    [OrgId], [Name], [Description], [IsFixed], 
    [IsActive], [CreatedBy], [CreatedOn], [UpdatedBy], 
    [UpdatedOn]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsFixed, 
    @IsActive, @CreatedBy, GETDATE(), @UpdatedBy, 
    @UpdatedOn
)', 1);

-- SQL Query for updating ExpenseTypes
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (63,
'UPDATE [dbo].[ExpenseTypes] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'',
    [IsFixed] = @IsFixed, [IsActive] = @IsActive, 
    [UpdatedBy] = @UpdatedBy, [UpdatedOn] = @UpdatedOn
WHERE
    [Id] = @Id;
', 1);
update dbo.ScreenQuery set SqlQuery = 
'UPDATE [dbo].[CustomerGroups] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'', 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, [UpdatedOn] = GETDATE()
WHERE
    [Id] = @Id;
'
where id = 64
	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (58,
'INSERT INTO [dbo].[PriceLists] (
    [OrgId], [StoreId], [Name], [IsItemWise], 
    [IsPercentage], [Value], [CreatedBy], [CreatedOn], 
    [UpdatedBy], [UpdatedOn], [IsActive]
) VALUES (
    @OrgId, @StoreId, ''@Name'', @IsItemWise, 
    @IsPercentage, @Value, @CreatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @UpdatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @IsActive
)', 1);

-- SQL Query for updating PriceLists
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (59,
'UPDATE [dbo].[PriceLists] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'',
    [IsItemWise] = @IsItemWise, [IsPercentage] = @IsPercentage, 
    [Value] = @Value, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [IsActive] = @IsActive
WHERE
    [Id] = @Id;
', 1);
	/*
	INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (54,
'INSERT INTO [dbo].[StoreTables] (
    [OrgId], [StoreId], [Name], [Description], 
    [Status], [CreatedBy], [CreatedOn], [UpdatedBy], 
    [UpdatedOn], [IsActive], [HoldOrderId]
) VALUES (
    @OrgId, @StoreId, ''@Name'', ''@Description'', 
    @Status, @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    @UpdatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    @IsActive, @HoldOrderId
)', 1);

-- SQL Query for updating StoreTables
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (55,
'UPDATE [dbo].[StoreTables] SET
    [OrgId] = @OrgId, [StoreId] = @StoreId, [Name] = ''@Name'',
    [Description] = ''@Description'', [Status] = @Status, 
    [UpdatedBy] = @UpdatedBy, [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [IsActive] = @IsActive, [HoldOrderId] = @HoldOrderId
WHERE
    [Id] = @Id;
', 1);


	/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (50,
'INSERT INTO [dbo].[PosTerminals] (
    [OrgId], [Name], [Description], [IsActive], 
    [CreatedBy], [CreatedOn], [TerminalType], [StoreId], 
    [LicenseKey]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsActive, 
    @CreatedBy, CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    ''@TerminalType'', @StoreId, ''@LicenseKey''
)', 1);

-- SQL Query for updating PosTerminals
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (51,
'UPDATE [dbo].[PosTerminals] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'',
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), 
    [TerminalType] = ''@TerminalType'', [StoreId] = @StoreId, 
    [LicenseKey] = ''@LicenseKey''
WHERE
    [Id] = @Id;
', 1);


	/*
INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (46,
'INSERT INTO [dbo].[PaymentTypes] (
    [OrgId], [Name], [Description], [IsDefault], 
    [IsSystemDefined], [IsActive], [CreatedBy], [CreatedOn], 
    [TranType]
) VALUES (
    @OrgId, ''@Name'', ''@Description'', @IsDefault, 
    @IsSystemDefined, @IsActive, @CreatedBy, 
    CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), @TranType
)', 1);

INSERT INTO dbo.ScreenQuery (OperationId, SqlQuery, IsActive)
VALUES (47,
'UPDATE [dbo].[PaymentTypes] SET
    [OrgId] = @OrgId, [Name] = ''@Name'', [Description] = ''@Description'',
    [IsDefault] = @IsDefault, [IsSystemDefined] = @IsSystemDefined, 
    [IsActive] = @IsActive, [UpdatedBy] = @UpdatedBy, 
    [UpdatedOn] = CONVERT([datetime], switchoffset(sysdatetimeoffset(), ''+05:30'')), [TranType] = @TranType
WHERE
    [Id] = @Id;
', 1);
