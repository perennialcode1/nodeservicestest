class Orders {
    constructor({
        Id, OrderNo, PosId, OrderType, Total, Discounts, SGST, CGST, IGST, Status, CreatedBy, UpdatedBy,
        OrgId, StoreId, Orderdate, DiscountId, DiningId, ReturnFromOrdId, CustomerId,
        PriceListId, TransportMode, TransportvehicleNumber, AdditionalCharges,
        AdditionalRoundOffAmount, IsAcknowledge, TransportAmount, InvoiceNo, EmpId
    }) {
        this.Id = Id;
        this.OrderNo = OrderNo;
        this.PosId = PosId;
        this.OrderType = OrderType;
        this.Total = Total;
        this.Discounts = Discounts;
        this.SGST = SGST;
        this.CGST = CGST;
        this.IGST = IGST;
        this.Status = Status;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.OrgId = OrgId;
        this.StoreId = StoreId;
        this.Orderdate = new Date(Orderdate).toISOString();
        this.DiscountId = DiscountId;
        this.DiningId = DiningId;
        this.ReturnFromOrdId = ReturnFromOrdId;
        this.CustomerId = CustomerId;
        this.PriceListId = PriceListId;
        this.TransportMode = TransportMode;
        this.TransportvehicleNumber = TransportvehicleNumber;
        this.AdditionalCharges = AdditionalCharges;
        this.AdditionalRoundOffAmount = AdditionalRoundOffAmount;
        this.IsAcknowledge = IsAcknowledge;
        this.TransportAmount = TransportAmount;
        this.InvoiceNo = InvoiceNo;
        this.EmpId = EmpId;
    }
}

module.exports = {
    Orders
};
