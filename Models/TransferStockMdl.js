class TransferStock {
    constructor({
        Id, OrgId, TSRId, FromStoreId, ToStoreId, TransferDate, Notes, 
        Status, CreatedBy, UpdatedBy, TSNumber, ReceivedDate, IsActive
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.TSRId = TSRId;
        this.FromStoreId = FromStoreId;
        this.ToStoreId = ToStoreId;
        this.TransferDate = TransferDate;
        this.Notes = Notes;
        this.Status = Status;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.TSNumber = TSNumber;
        this.ReceivedDate = ReceivedDate;
    }
}

module.exports = {
    TransferStock
};