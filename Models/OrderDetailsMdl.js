class OrderDetails {
    constructor({
        Id,OrgId, OrderId, ProductId, Quantity, UnitPrice, Discount,
        SGSTS, CGSTS, IGSTS, Total, Status, RefundQuantity, VendorId, IsComplement,
        CGSTrate, SGSTrate, IGSTrate, NoOfBags, Comments,
        ItemWeight, ItemPackingWeight, BilledBarCode, CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.OrderId = OrderId;
        this.ProductId = ProductId;
        this.Quantity = Quantity;
        this.UnitPrice = UnitPrice;
        this.Discount = Discount;
        this.SGSTS = SGSTS;
        this.CGSTS = CGSTS;
        this.IGSTS = IGSTS;
        this.Total = Total;
        this.Status = Status;
        this.RefundQuantity = RefundQuantity;
        this.VendorId = VendorId;
        this.IsComplement = IsComplement;
        this.CGSTrate = CGSTrate;
        this.SGSTrate = SGSTrate;
        this.IGSTrate = IGSTrate;
        this.NoOfBags = NoOfBags;
        this.Comments = Comments;
        this.ItemWeight = ItemWeight;
        this.ItemPackingWeight = ItemPackingWeight;
        this.BilledBarCode = BilledBarCode;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    OrderDetails
};
