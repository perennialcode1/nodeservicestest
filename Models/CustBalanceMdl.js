class CustBalance {
    constructor({
        Id,CustId, Amount, LastRechargeId, LastOrderId, OrgId, CreatedBy, UpdatedBy
    }) {
        this.Id = Id;
        this.CustId = CustId;
        this.Amount = Amount;
        this.LastRechargeId = LastRechargeId;
        this.LastOrderId = LastOrderId;
        this.OrgId = OrgId;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
    }
}

module.exports = {
    CustBalance
};
