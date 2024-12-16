class Discounts {
    constructor({
        Id, OrgId, StoreId, Name, Description, IsFixed, Value, Limit, 
        CreatedBy, UpdatedBy, IsActive
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Name = Name;
        this.Description = Description;
        this.IsFixed = IsFixed;
        this.Value = Value;
        this.Limit = Limit;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
    }
}

module.exports = {
    Discounts
};