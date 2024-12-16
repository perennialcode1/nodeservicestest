class Units {
    constructor({
        Id, OrgId, Name, ConversionFactor, Code, IsActive, CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name= Name;
        this.ConversionFactor = ConversionFactor;
        this.Code = Code;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    Units
};
