// JavaScript class for GroupProdDiscount
class GroupProdDiscount {
    constructor({
        Id, OrgId, Name, StoreId, ProductId, CustGroupId, FromDate, ToDate,
        IsPercentage, MaxDiscountValue, MinProductValue, Value, Quantity, IsActive,
        CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.StoreId = StoreId;
        this.ProductId = ProductId;
        this.CustGroupId = CustGroupId;
        this.FromDate = FromDate;
        this.ToDate = ToDate;
        this.IsPercentage = IsPercentage;
        this.MaxDiscountValue = MaxDiscountValue;
        this.MinProductValue = MinProductValue;
        this.Value = Value;
        this.Quantity = Quantity;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    GroupProdDiscount
};
