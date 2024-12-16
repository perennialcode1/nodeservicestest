class ProductVariants {
    constructor({
        Id, OrgId, ProductId, VariantTypeId, Value, IsActive, CreatedBy, CreatedOn, CalcVal
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.ProductId = ProductId;
        this.VariantTypeId = VariantTypeId;
        this.Value = Value;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.CalcVal = CalcVal;
    }
}

module.exports = {
    ProductVariants
};
