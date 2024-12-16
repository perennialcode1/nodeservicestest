class Taxes {
    constructor({
        Id, OrgId, TaxRate, Description, IsDefault, IsActive, CreatedBy, UpdatedBy,
        SGSTRate, CGSTRate, IGSTRate
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.TaxRate = TaxRate;
        this.Description = Description;
        this.IsDefault = IsDefault;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.SGSTRate = SGSTRate;
        this.CGSTRate = CGSTRate;
        this.IGSTRate = IGSTRate;
    }
}

module.exports = {
    Taxes
};