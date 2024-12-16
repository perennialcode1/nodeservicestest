class StockIndent {
    constructor({
        Id, OrgId, StoreId, IndentNo, IndentDt, ProductId, ReqQty, CurrentStock,
        IndentStatus, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, IsActive, Operation
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.IndentNo = IndentNo;
        this.IndentDt = IndentDt;
        this.ProductId = ProductId;
        this.ReqQty = ReqQty;
        this.CurrentStock = CurrentStock;
        this.IndentStatus = IndentStatus;
        this.CreatedBy = CreatedBy;
        this.CreatedOn = CreatedOn;
        this.UpdatedBy = UpdatedBy;
        this.UpdatedOn = UpdatedOn;
        this.IsActive = IsActive;
        this.Operation = Operation;
    }
}

module.exports = {
    StockIndent
};
