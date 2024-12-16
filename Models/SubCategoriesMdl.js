class SubCategories {
    constructor({
        Id, OrgId, Name, Description, IsDefault, IsActive, CreatedBy, UpdatedBy, Code, Qty
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsDefault = IsDefault;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.Code = Code;
        this.Qty = Qty;
    }
}

module.exports = {
    SubCategories
};
