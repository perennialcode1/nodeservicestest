class PaymentTypes {
    constructor({
        Id, OrgId, Name, Description, IsDefault, IsSystemDefined, IsActive, CreatedBy, UpdatedBy, TranType
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsDefault = IsDefault;
        this.IsSystemDefined = IsSystemDefined;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.TranType = TranType;
    }
}

module.exports = {
    PaymentTypes
};