class DiningOptions {
    constructor({
        Id, OrgId, StoreId, Name, Description, CreatedBy, UpdatedBy, IsActive, IsDefault
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Name = Name;
        this.Description = Description;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
        this.IsDefault = IsDefault;
    }
}

module.exports = {
    DiningOptions
};
