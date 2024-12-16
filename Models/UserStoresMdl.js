class UserStores {
    constructor({
        Id, OrgId, UserId, StoreId, CreatedBy, UpdatedBy, IsActive
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.UserId = UserId;
        this.StoreId = StoreId;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
    }
}

module.exports = {
    UserStores
};
