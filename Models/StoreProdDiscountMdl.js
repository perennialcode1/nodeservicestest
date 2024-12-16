class StoreProdDiscount {
    constructor({
        Id, Name, OrgId, StoreId, ProductId, Quantity, FromDate, ToDate,
        IsPercentage, MaxDiscountValue, MinProductValue, Value, IsActive,
        CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.Name = Name;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.FromDate = FromDate;
        this.ToDate = ToDate;
        this.IsPercentage = IsPercentage;
        this.MaxDiscountValue = MaxDiscountValue;
        this.MinProductValue = MinProductValue;
        this.Value = Value;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;

    }
}

module.exports = {
    StoreProdDiscount
};
