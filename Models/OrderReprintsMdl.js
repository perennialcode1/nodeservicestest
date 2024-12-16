class OrderReprints {
    constructor({
        OrgId, OrderId, Reason, CreatedBy, UpdatedBy, IsActive
    }) {
        this.OrgId = OrgId;
        this.OrderId = OrderId;
        this.Reason = Reason;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
    }
}

module.exports = {
    OrderReprints
};
