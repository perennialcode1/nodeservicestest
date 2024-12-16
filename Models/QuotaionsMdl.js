class Quotaions {
    constructor({
        Id, QuotaionNo, PosId, Total, Discounts, SGSTS, CGSTS, IGSTS, Status, IsActive,
        CreatedBy, UpdatedBy, OrgId, StoreId, Quotaiondate, DiscountId, DiningId,
        ReturnFromOrdId, CustomerId, PriceListId, ExpectedDelivery, Notes, AdvanceAmount
    }) {
        this.Id = Id;
        this.QuotaionNo = QuotaionNo;
        this.PosId = PosId;
        this.Total = Total;
        this.Discounts = Discounts;
        this.SGSTS = SGSTS;
        this.CGSTS = CGSTS;
        this.IGSTS = IGSTS;
        this.Status = Status;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Quotaiondate = new Date().toISOString();
        this.DiscountId = DiscountId;
        this.DiningId = DiningId;
        this.ReturnFromOrdId = ReturnFromOrdId;
        this.CustomerId = CustomerId;
        this.PriceListId = PriceListId;
        this.ExpectedDelivery = ExpectedDelivery;
        this.Notes = Notes;
        this.AdvanceAmount = AdvanceAmount;
    }
}

module.exports = {
    Quotaions
};
