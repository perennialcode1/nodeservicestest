class MartInventory {
    constructor({
        Id, OrgId, StoreId, ProductId, BatchNo, Qunatity, ExpireDate, Barcode, 
        CreatedBy, UpdatedBy, MRP, SalePrice, PurchasePrice, HasPercentage, DiscountValue
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.ProductId = ProductId;
        this.BatchNo = BatchNo;
        this.Qunatity = Qunatity;
        this.ExpireDate = ExpireDate;
        this.Barcode = Barcode;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.MRP = MRP;
        this.SalePrice = SalePrice;
        this.PurchasePrice = PurchasePrice;
        this.HasPercentage = HasPercentage;
        this.DiscountValue = DiscountValue;
    }
}

module.exports = {
    MartInventory
};