class SupplierProducts {
    constructor({
        Id, OrgId, SupplierId, ProductId,   IsActive, 
        CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.SupplierId = SupplierId;
        this.ProductId = ProductId;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    SupplierProducts
};
