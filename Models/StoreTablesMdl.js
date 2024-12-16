class StoreTables {
    constructor({
        Id, OrgId, StoreId, Name, Description, Status, CreatedBy, UpdatedBy, IsActive, HoldOrderId
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Name = Name;
        this.Description = Description;
        this.Status = Status;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
        this.HoldOrderId = HoldOrderId;
    }
}

module.exports = {
    StoreTables
};