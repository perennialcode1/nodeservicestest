class StockHistory {
    constructor({
        Id, OrgId, ProductId, StoreId, StockEffectTypeId, 
        StockAdjusted, StockAfter, OrderId, PurchaseOrderId, 
        TransfarStockId, StockAdjustId, IsActive, CreatedBy, 
        UpdatedBy, SupplierId, MartInventoryId
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.ProductId = ProductId;
        this.StoreId = StoreId;
        this.StockEffectTypeId = StockEffectTypeId;
        this.StockAdjusted = StockAdjusted;
        this.StockAfter = StockAfter;
        this.OrderId = OrderId;
        this.PurchaseOrderId = PurchaseOrderId;
        this.TransfarStockId = TransfarStockId;
        this.StockAdjustId = StockAdjustId;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.SupplierId = SupplierId;
        this.MartInventoryId = MartInventoryId;
    }
}

module.exports = {
    StockHistory
};