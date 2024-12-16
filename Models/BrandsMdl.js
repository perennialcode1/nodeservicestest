class Brands {
    constructor({
        Id, OrgId, Name, Description, IsActive, CreatedBy, UpdatedBy, Code, Filepath
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.Code = Code;
        this.Filepath = Filepath;
    }
}

module.exports = {
    Brands
};
