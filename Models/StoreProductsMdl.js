class StoreProducts {
    constructor({
        Id, OrgId, StoreId, ProductId, Prices, PriceInclusiveTax, VendorId, IsActive,
        CreatedBy, UpdatedBy, TaxId, LowStock, OptimalStock, InStock, IsForSale,CategoryId,BarCode,DestinationStoreId
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.ProductId = ProductId;
        this.Prices = Prices;
        this.PriceInclusiveTax = PriceInclusiveTax;
        this.VendorId = VendorId;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.TaxId = TaxId;
        this.LowStock = LowStock;
        this.OptimalStock = OptimalStock;
        this.InStock = InStock;
        this.IsForSale = IsForSale;
        this.CategoryId = CategoryId;
        this.BarCode = BarCode;
        this.DestinationStoreId = DestinationStoreId;
    }
}

module.exports = {
    StoreProducts
};
