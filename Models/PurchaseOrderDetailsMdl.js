class PurchaseOrderDetails {
    constructor({
        Id, OrgId, PurchaseOrderId, ProductId, Quantity, Rate, Amount, Status, 
        IsActive, CreatedBy,  UpdatedBy, ReceivedQty, 
        AddedStock, RejectedQty, Reason, MRP, Barcode, ExpiryDate
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.PurchaseOrderId = PurchaseOrderId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.Rate = Rate;
        this.Amount = Amount;
        this.Status = Status;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.ReceivedQty = ReceivedQty;
        this.AddedStock = AddedStock;
        this.RejectedQty = RejectedQty;
        this.Reason = Reason;
        this.MRP = MRP;
        this.Barcode = Barcode;
        this.ExpiryDate = ExpiryDate;
    }
}

module.exports = {
    PurchaseOrderDetails
};
