class Categories {
    constructor({
        Id, OrgId, Name, Description, IsDefault, IsActive, CreatedBy,UpdatedBy,
        Code, ImagePath, ImageUrl, TakeAway, Type
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsDefault = IsDefault;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.Code = Code;
        this.ImagePath = ImagePath;
        this.ImageUrl = ImageUrl;
        this.TakeAway = TakeAway;
        this.Type = Type;
    }
}

module.exports = {
    Categories
};
