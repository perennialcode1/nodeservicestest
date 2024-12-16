

use [db_a6b5c9_ibizshop]
--https://www.codeproject.com/Articles/1118364/Connecting-to-an-MS-SQL-Instance-using-NodeJS-Fixi(node.js error)
--customers jsondata:
/*{
    "Id":95283,
    "OrgId": 1,
    "Name": "Johnabrar",
    "Email": "johndoe@example.com",
    "Mobile": "1234567890",
    "Notes": "Sample notes",
    "BilligAddressId": 1,
    "ShippingAddressId": 2,
    "CreatedBy": 1,
    "IsActive": 1,
    "Amount": 1000.50,
    "EmpType": 1,
    "IsPostPaidAllowed": 1,
    "CustGroupId": 1,
    "GSTIN": "GST1234567",
    "DOB": "1990-01-01T00:00:00.000Z",
    "Anniversary": "1995-01-01T00:00:00.000Z",
    "CardNumber": "1234-5678-9012-3456"
}

EXEC [dbo].[SP_Operat]
            @OperationId = '2',
            @JsonData = '{"Id":"95284",
        "OrgId":"1",
        "Name": "JohnAbhrar",
        "Email": "johndoe@example.com",
        "Mobile": "1234567890",
        "Notes": "Samplenotes",
        "BilligAddressId": "1",
        "ShippingAddressId": "2",
       "CreatedBy":"1",
    "UpdatedBy": "1",
        "IsActive": "1",
        "Amount": "1000.5",
        "EmpType": "1",
        "IsPostPaidAllowed": "1",
        "CustGroupId": "1",
        "GSTIN": "GST1234567",
        "DOB": "1990-01-01",
        "Anniversary": "1995-01-01",
        "CardNumber": "1234-5678-9012-3456"
	}'
get __EXEC [dbo].[SP_Operat]
            @OperationId = '8',
            @JsonData = '{"OrgId":"1"}'
    }'*/

	
--Categories JSONDATA:
/*{
    "Id":"4243",
    "OrgId": "1",
    "Name": "Johnabhrar",
    "Description": "Sample description",
    "IsDefault": "0",
    "IsActive": "1",
    "CreatedBy":"1",
    "UpdatedBy": "1",
    "Code": "CAT0",
    "ImagePath": "/path/to/image",
    "ImageUrl": "http://example.com/image.jpg",
    "TakeAway": "1",
    "Type": "TypeValue"
}


--SubCategories
{
   "Id":"157",
    "OrgId": "1",
    "Name": "inSubCategorys",
    "Description": "Sample Description",
    "IsDefault": "0",
    "IsActive": "1",
    "CreatedBy":"1",
    "UpdatedBy": "1",
    "Code": "SC001",
    "Qty": "100"
}

--Stores
{
    "Id":"179",
    "OrgId": "1",
    "Name": "UpdateStore",
    "Address": "123 Sample St, Sample City",
    "PhoneNo": "1234567890",
    "Description": "Sample Description",
    "DefaultTaxInclusive": "1",
    "IsActive": "1",
    "CreatedBy":"1",
    "UpdatedBy": "1",
    "IsMainStore": "1",
    "GSTIN": "GST1234567",
    "StoreNumber": "S001",
    "BankDetails": "Sample Bank Details",
    "EmailId": "sample@store.com",
    "State": "SampleState",
    "City": "SampleCity",
    "GSTBillCode": "GST01",
    "NonGSTBillCode": "NGST01",
    "StoreCode": "SC001",
    "AddressLine2": "Address Line 2",
    "AddressLine3": "Address Line 3"
}

--Expenses:
{
    "Id": "881",
    "OrgId": "41028",
    "ExpenseTypeId": "84",  // Assuming you have ExpenseTypeId available; adjust the value accordingly
    "DateOfTransaction": "2024-04-24T15:41:04Z",  // Current date and time
    "Amount": "100.00",  // Sample amount
    "ImagePath": "/path/to/image.jpg",  // Sample image path
    "Quantity": "1.5",  // Sample quantity
    "Note": "Sample Note",  // Sample note
    "IsApproved": "1",
    "IsFixed": "0",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "StoreId": "41",
    "StartDate": "''2022-12-01''",
    "EndDate": "''2023-12-30''" // Assuming StoreId available; adjust the value accordingly
}

EXEC [dbo].[SP_Operat]
            @OperationId = '8',
            @JsonData = '"{\"OrgId\":\"1\"}"'
    


	EXEC [dbo].[SP_Operat]
            @OperationId = '8',
            @JsonData = '{"OrgId":"1"}'

			--taxes
{
    "Id": "1146",
    "OrgId": "41028",
    "TaxRate": "18.00",
    "Description": "UStandard GST",
    "IsDefault": "0",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "SGSTRate": "9.00",
    "CGSTRate": "9.00",
    "IGSTRate": "0.00"
}
-- Discounts 
{
    "Id": "1",
    "OrgId": "1",
    "StoreId": "1",  // Assuming StoreId available; adjust the value accordingly
    "Name": "10% Off",
    "Description": "10% discount on all items",
    "IsFixed": "1",
    "Value": "10.00",
    "Limit": "100.00",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "IsActive": "1"
}

-- Suppliers
{
    "Id": "3",
    "OrgId": "41028",
    "SuplierName": "UC Suppliers",
    "ContactName": "John Doe",
    "EmailId": "johndoe@example.com",
    "PhoneNo": "1234567890",
    "Website": "www.abcsuppliers.com",
    "AddressLine1": "123 Supplier St",
    "AddressLine2": "Suite 101",
    "City": "Supplier City",
    "StateOrProvince": "Supplier State",
    "Country": "Supplier Country",
    "ZIPCode": "12345",
    "Notes": "Sample notes about the supplier",
    "IsVender": "1",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "GSTN": "GST1234567",
    "IsIGST": "0"
}

-- TransferStock
{
    "Id": "10",
    "OrgId": "41028",
    "TSRId": "2",
    "FromStoreId": "1",
    "ToStoreId": "1",
    "TransferDate": "2024-04-26",
    "Notes": "Transfer of stock from Store 101 to Store 102",
    "Status": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "TSNumber": "TS1001",
    "ReceivedDate": "2024-04-26"
}

--martInventory
{
    "Id": "4",
    "OrgId":"41028",
    "StoreId": "1",
    "ProductId": "1004",
    "BatchNo": "BATCH001",
    "Qunatity": "100",
    "ExpireDate": "2024-12-31T00:00:00Z",
    "Barcode": "1234567890",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "MRP": "10.99",
    "SalePrice": "8.99",
    "PurchasePrice": "5.99",
    "HasPercentage": "1",
    "DiscountValue": "0.10"
}


--PurchaseOrders
{
    "Id": "2",
    "OrgId": "41028",
    "StoreId": "2",
    "PoNumber": "PO123456",
    "SupplierId": "3001",
    "PoDate": "2024-04-27",
    "ExpectedDate": "2024-05-05",
    "Notes": "Sample notes for the purchase order.",
    "Status": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "ReferenceNo": "REF987654"
}

--Paymentypes

{
    "Id": "1",
    "OrgId": "41028",
    "Name": "Updated Card",
    "Description": "Payment via Credit Card",
    "IsDefault": "1",
    "IsSystemDefined": "1",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "TranType": "2"
}

-- posterminals

{
    "Id": "1",
    "OrgId": "41028",
    "Name": "UTerminal1",
    "Description": "Point of Sale Terminal 1",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "TerminalType": "Physical",
    "StoreId": "1",
    "LicenseKey": "ABC123XYZ"
}

--Storetables

{
    "Id": "1",
    "OrgId": "41028",
    "StoreId": "1",
    "Name": "Table2",
    "Description": "Table 1 in the restaurant area",
    "Status": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "IsActive": "1",
    "HoldOrderId": "1"
}


--pricelists

{
    "Id": "1",
    "OrgId": "41028",
    "StoreId": "1",
    "Name": "UPDiscount List",
    "IsItemWise": "0",
    "IsPercentage": "1",
    "Value": "10.00",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "IsActive": "1"
}

--expensetypes

{
    "Id": "1",
    "OrgId": "41028",
    "Name": "UPUtilities",
    "Description": "Expenses related to utilities such as electricity, water, and gas.",
    "IsFixed": "0",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}

--GroupProdDiscount

{
    "Id": "1",
    "OrgId": "41028",
    "Name": "UPGroup Discount",
    "StoreId": "1",
    "ProductId": "1001",
    "CustGroupId": "5001",
    "FromDate": "2024-05-01",
    "ToDate": "2024-06-01",
    "IsPercentage": "1",
    "MaxDiscountValue": "20.00",
    "MinProductValue": "50.00",
    "Value": "10.00",
    "Quantity": "5.0",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}

--CustomerGroups

{
    "Id": "1",
    "OrgId": "41028",
    "StoreId": "1",
    "Name": "UGold Members",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}


--StoreProdDiscount

{
    "Id": "2",
    "Name": "Discount 1",
    "OrgId": "41028",
    "StoreId": "1",
    "ProductId": "789",
    "Quantity": "100",
    "FromDate": "2024-05-01",
    "ToDate": "2024-06-01",
    "IsPercentage": "1",
    "MaxDiscountValue": "50.00",
    "MinProductValue": "10.00",
    "Value": "0.15",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}
--HoldOrders

{
    "Id": "1",
    "OrgId": "41028",
    "StoreId": "1",
    "PosId": "789",
    "DiningId": "1",
    "HoldType": "1",
    "TableId": "1",
    "HoldName": "1",
    "DiscountId": "1",
    "OrderTotal": "100.00",
    "Status": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "IsActive": "1",
    "CustomerId": "1",
    "PriceListId": "1"
}

--orders 
{
    "Id": "3",
    "OrderNo": "ORTYUT",
    "PosId": "789",
    "OrderType": "1",
    "Total": "100.500",
    "Discounts": "10.00",
    "SGST": "5.00",
    "CGST": "5.00",
    "IGST": "0",
    "Status": "1",
    "CreatedBy": "1",
    "OrgId": "41028",
    "StoreId": "456",
    "DiningId": "1",
    "Orderdate": "2024-04-29",
    "DiscountId": "10",
    "ReturnFromOrdId": "1",
    "CustomerId": "789",
    "PriceListId": "1",
    "TransportMode": "Air",
    "TransportvehicleNumber": "1234ABC",
    "AdditionalCharges": "5.00",
    "AdditionalRoundOffAmount": "0.50",
    "IsAcknowledge": "1",
    "TransportAmount": "null",
    "InvoiceNo": "INV123456",
    "EmpId": "1", 
    "UpdatedBy": "1"
}


--Custbalance
{
    "Id":"1",
    "CustId": "1",
    "Amount": "500.00",
    "LastRechargeId": "456",
    "LastOrderId": "789",
    "OrgId": "41028",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}

orderdetails
{
    "Id":"2",
    "OrgId": "41028",
    "OrderId": "1",
    "ProductId": "789",
    "Quantity": "2",
    "UnitPrice": "15.99",
    "Discount": "5.00",
    "SGSTS": "1.50",
    "CGSTS": "1.50",
    "IGSTS": "0.00",
    "Total": "31.98",
    "Status": "1",
    "RefundQuantity":"1",
    "VendorId": "123",
    "IsComplement": "1",
    "CGSTrate": "2.5",
    "SGSTrate": "2.5",
    "IGSTrate": "0",
    "NoOfBags": "1",
    "Comments": "Test comment",
    "ItemWeight": "0.5",
    "ItemPackingWeight": "0.2",
    "BilledBarCode": "123456789012",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}

--orderpayments

{
    "Id": "2",
    "OrgId": "41028",
    "OrderId": "101",
    "PaymentTypeId": "123",
    "PaidAmount": "50.00",
    "CardNo": "1234567890123456",
    "MobileNo": "9876543210",
    "CreatedBy": "1",
    "UpdatedBy": "1"
}

--stock history 

{
    "Id": "1",
    "OrgId": "41028",
    "ProductId": "6",
    "StoreId": "1",
    "StockEffectTypeId": "1",
    "StockAdjusted": "10.5",
    "StockAfter": "105.5",
    "OrderId": "123",
    "PurchaseOrderId": "456",
    "TransfarStockId": "789",
    "StockAdjustId": "101",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "SupplierId": "987",
    "MartInventoryId": "654"
}
--quotaions

{
    "Id": "2",
    "QuotaionNo": "QUO123456",
    "PosId": "1",
    "Total": "500.00",
    "Discounts": "50.00",
    "SGSTS": "25.00",
    "CGSTS": "25.00",
    "IGSTS": "0.00",
    "Status": "1",
    "IsActive": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "OrgId": "41028",
    "StoreId": "1",
    "Quotaiondate": "2024-05-01",
    "DiscountId": "789",
    "DiningId": "123",
    "ReturnFromOrdId": "456",
    "CustomerId": "789",
    "PriceListId": "101",
    "ExpectedDelivery": "2024-05-10",
    "Notes": "Sample notes",
    "AdvanceAmount": "100.00"
}


--kotdetails

{
    "Id": "1",
    "OrgId": "41028",
    "KOTId": "12345",
    "ProductId": "456",
    "Quantity": "2",
    "Status": "1",
    "IsActive": "1",
    "IsComplement": "1",
    "CreatedBy": "1",
    "UpdatedBy": "1",
    "Comments": "Sample comment",
    "ExplicitPrice": "25.00"
}
