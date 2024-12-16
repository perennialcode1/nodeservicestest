class Expenses {
    constructor({
        Id, OrgId, ExpenseTypeId, DateOfTransaction, Amount, 
        ImagePath, Quantity, Note, IsApproved, 
        IsFixed, IsActive, CreatedBy, UpdatedBy, StoreId, StartDate, EndDate
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.ExpenseTypeId = ExpenseTypeId;
        this.DateOfTransaction = DateOfTransaction;
        this.Amount = Amount;
        this.ImagePath = ImagePath;
        this.Quantity = Quantity;
        this.Note = Note;
        this.IsApproved = IsApproved;
        this.IsFixed = IsFixed;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.StoreId = StoreId;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
    }
}

module.exports = {
    Expenses
};
