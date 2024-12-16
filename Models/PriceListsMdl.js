class PriceLists {
    constructor({
        Id, OrgId, StoreId, Name, IsItemWise, IsPercentage, Value, CreatedBy, UpdatedBy, IsActive
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Name = Name;
        this.IsItemWise = IsItemWise;
        this.IsPercentage = IsPercentage;
        this.Value = Value;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
    }
}

module.exports = {
    PriceLists
};