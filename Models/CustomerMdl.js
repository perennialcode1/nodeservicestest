class Customer {
    constructor({
        Id,OrgId, Name, Email, Mobile, Notes, BilligAddressId, ShippingAddressId,
        CreatedBy, UpdatedBy, IsActive, GSTIN, DOB, Anniversary, CardNumber,
        Amount, EmpType, IsPostPaidAllowed, CustGroupId
    }) {
        this.Id = Id,
        this.OrgId = OrgId;
        this.Name = Name;
        this.Email = Email;
        this.Mobile = Mobile;
        this.Notes = Notes;
        this.BilligAddressId = BilligAddressId;
        this.ShippingAddressId = ShippingAddressId;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsActive = IsActive;
        this.GSTIN = GSTIN;
        this.DOB = DOB;
        this.Anniversary = Anniversary;
        this.CardNumber = CardNumber;
        this.Amount = Amount;
        this.EmpType = EmpType;
        this.IsPostPaidAllowed = IsPostPaidAllowed;
        this.CustGroupId = CustGroupId;
    }
}

module.exports = {
    Customer
};
