class Suppliers {
    constructor({
        Id, OrgId, SuplierName, ContactName, EmailId, PhoneNo, Website, 
        AddressLine1, AddressLine2, City, StateOrProvince, Country, ZIPCode, 
        Notes, IsVender, IsActive, CreatedBy, UpdatedBy, GSTN, IsIGST, PayTermDays
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.SuplierName = SuplierName;
        this.ContactName = ContactName;
        this.EmailId = EmailId;
        this.PhoneNo = PhoneNo;
        this.Website = Website;
        this.AddressLine1 = AddressLine1;
        this.AddressLine2 = AddressLine2;
        this.City = City;
        this.StateOrProvince = StateOrProvince;
        this.Country = Country;
        this.ZIPCode = ZIPCode;
        this.Notes = Notes;
        this.IsVender = IsVender;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.GSTN = GSTN;
        this.IsIGST = IsIGST;
        this.PayTermDays = PayTermDays;
    }
}

module.exports = {
    Suppliers
};