class VariantTypes {
    constructor({
        Id, Name, Value, Description, Isactive, CreatedBy, UpdatedBy, Calc
    }) {
        this.Id = Id;
        this.Name = Name;
        this.Value = Value;
        this.Description = Description;
        this.Isactive = Isactive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.Calc = Calc;
    }
}

module.exports = {
    VariantTypes
};
