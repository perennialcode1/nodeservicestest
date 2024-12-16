class Users {
    constructor({
        Id,RoleId, Name, Password, IsActive, CreatedBy, UpdatedBy, OrgId, Mobile, Email, IsMobile, Gender
    }) {
        this.Id = Id;
        this.RoleId = RoleId;
        this.Name = Name;
        this.Password = Password;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.OrgId = OrgId;
        this.Mobile = Mobile;
        this.Email = Email;
        this.IsMobile = IsMobile;
        this.Gender = Gender
    }
}

module.exports = {
    Users
};
