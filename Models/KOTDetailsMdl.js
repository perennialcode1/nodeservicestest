class KOTDetails {
    constructor({
        Id, OrgId, KOTId, ProductId, Quantity, Status, IsActive,IsComplement,
        CreatedBy, UpdatedBy, Comments, ExplicitPrice
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.KOTId = KOTId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.Status = Status;
        this.IsComplement = IsComplement;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
        this.Comments = Comments;
        this.ExplicitPrice = ExplicitPrice;
    }
}

module.exports = {
    KOTDetails
};
