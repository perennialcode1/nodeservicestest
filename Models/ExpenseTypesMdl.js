class ExpenseTypes {
    constructor({
        Id, OrgId, Name, Description, IsFixed, IsActive, CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsFixed = IsFixed;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;

    }
}

module.exports = {
    ExpenseTypes
};