class Products {
    constructor({
        Id,OrgId, CategoryId, SubCategoryId, BarCode, Name, Description, AvgPrice,
        ImagePath, ImageUrl, TrackStock, IsCompositeItem, StoreWiseTaxes,
        IsActive, CreatedBy, UpdatedBy, SoldbyWeight, ProductSKU, HSN,
        Weight, PackingWeight, code, MRP, ManufacturedDate, ExpiredDate
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.CategoryId = CategoryId;
        this.SubCategoryId = SubCategoryId;
        this.BarCode = BarCode;
        this.Name = Name;
        this.Description = Description;
        this.AvgPrice = AvgPrice;
        this.ImagePath = ImagePath;
        this.ImageUrl = ImageUrl;
        this.TrackStock = TrackStock;
        this.IsCompositeItem = IsCompositeItem;
        this.StoreWiseTaxes = StoreWiseTaxes;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.SoldbyWeight = SoldbyWeight;
        this.ProductSKU = ProductSKU;
        this.HSN = HSN;
        this.Weight = Weight;
        this.PackingWeight = PackingWeight;
        this.code = code;
        this.MRP = MRP;
        this.ManufacturedDate = ManufacturedDate;
        this.ExpiredDate = ExpiredDate;
    }
}

module.exports = {
    Products
};
