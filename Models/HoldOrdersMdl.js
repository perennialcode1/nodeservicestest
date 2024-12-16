class HoldOrders {
    constructor({
        Id, OrgId, StoreId, PosId, DiningId, HoldType, TableId,
        HoldName, DiscountId, OrderTotal, Status, CreatedBy,
        UpdatedBy, IsActive, CustomerId, PriceListId
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.PosId = PosId;
        this.DiningId = DiningId;
        this.HoldType = HoldType;
        this.TableId = TableId;
        this.HoldName = HoldName;
        this.DiscountId = DiscountId;
        this.OrderTotal = OrderTotal;
        this.Status = Status;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
        this.CustomerId = CustomerId;
        this.PriceListId = PriceListId;
    }
}

module.exports = {
    HoldOrders
};
