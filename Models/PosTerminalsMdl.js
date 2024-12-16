class PosTerminals {
    constructor({
        Id, OrgId, Name, Description, IsActive, CreatedBy, UpdatedBy, TerminalType, StoreId, LicenseKey
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.TerminalType = TerminalType;
        this.StoreId = StoreId;
        this.LicenseKey = LicenseKey;
    }
}

module.exports = {
    PosTerminals
};