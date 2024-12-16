class Stores {
    constructor({
        Id, OrgId, Name, Address, PhoneNo, Description, DefaultTaxInclusive, IsActive, CreatedBy, UpdatedBy,
        IsMainStore, GSTIN, StoreNumber, BankDetails, EmailId, State, City, GSTBillCode,
        NonGSTBillCode, StoreCode, AddressLine2, AddressLine3  
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Address = Address;
        this.PhoneNo = PhoneNo;
        this.Description = Description;
        this.DefaultTaxInclusive = DefaultTaxInclusive;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.IsMainStore = IsMainStore;
        this.GSTIN = GSTIN;
        this.StoreNumber = StoreNumber;
        this.BankDetails = BankDetails;
        this.EmailId = EmailId;
        this.State = State;
        this.City = City;
        this.GSTBillCode = GSTBillCode;
        this.NonGSTBillCode = NonGSTBillCode;
        this.StoreCode = StoreCode;
        this.AddressLine2 = AddressLine2;
        this.AddressLine3 = AddressLine3;
    }
}

module.exports = {
    Stores
};
