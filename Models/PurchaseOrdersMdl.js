class PurchaseOrders {
    constructor({
        Id, OrgId, StoreId, PoNumber, SupplierId, 
        PoDate, ExpectedDate, Notes, Status, 
        CreatedBy, UpdatedBy, ReferenceNo,
        PurchaseOrderId, ProductId, Quantity, Rate, Amount, Status2, 
      ReceivedQty, 
        AddedStock, RejectedQty, Reason, MRP, Barcode, ExpiryDate, PoFrom, PoTo
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.PoNumber = PoNumber;
        this.SupplierId = SupplierId;
        this.PoDate = PoDate;
        this.ExpectedDate = ExpectedDate;
        this.Notes = Notes;
        this.Status = Status;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.ReferenceNo = ReferenceNo;
        this.PurchaseOrderId = PurchaseOrderId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.Rate = Rate;
        this.Amount = Amount;
        this.Status2 = Status2;
        this.ReceivedQty = ReceivedQty;
        this.AddedStock = AddedStock;
        this.RejectedQty = RejectedQty;
        this.Reason = Reason;
        this.MRP = MRP;
        this.Barcode = Barcode;
        this.ExpiryDate = ExpiryDate;
        this.PoFrom = PoFrom;
        this.PoTo = PoTo;
    }
}

module.exports = {
    PurchaseOrders
};