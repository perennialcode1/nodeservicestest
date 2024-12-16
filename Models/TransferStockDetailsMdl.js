class TransferStockDetails {
    constructor({
        Id, OrgId, ProductId, Quantity, Status, IsActive, CreatedBy,
        UpdatedBy, TSId
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.Status = Status;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.TSId = TSId;
    }
}

module.exports = {
    TransferStockDetails
};
