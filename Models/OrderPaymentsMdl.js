class OrderPayments {
    constructor({
        Id, OrgId, OrderId, PaymentTypeId, PaidAmount,
        CardNo, MobileNo, CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.OrderId = OrderId;
        this.PaymentTypeId = PaymentTypeId;
        this.PaidAmount = PaidAmount;
        this.CardNo = CardNo;
        this.MobileNo = MobileNo;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    OrderPayments
};
