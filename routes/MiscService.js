const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const notifications = require('../helpers/notifications.js');
const dbUtility = require('../dbUtility');
const router = express.Router();
router.use(express.json());

router.get('/ibiznotify', (req, res) => {
    const {OrgId} = req.query;
    //const data = { "OrgId": OrgId };
    notifications.NotifyQueue(OrgId, res, (error, Results) => {
        if (error) {
            res.status(200).send({ error: error.message });
            return;
         }
  });
});
router.get('/ibizexec', (req, res) => {
    const {OrgId} = req.query;
    //const data = { "OrgId": OrgId };
    dbUtility.executeSP(OrgId,'dbo.SP_MissedIndentNotify', (error, results) => {
        res.status(200).send(results);
    });      
});
router.get('/getNotifications', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETNOTIFY); 
});
router.post('/GetExpenses', async (req, res) => {
    try {
        const ExpensesData = req.body; // Assuming req.body contains the customer data
        const { Expenses } = require('../Models/ExpensesMdl.js');
        const data = new Expenses(ExpensesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().EXPNSLIST);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
router.post('/InsertExpenses', async (req, res) => {
    try {
        const ExpensesData = req.body; // Assuming req.body contains the customer data
        const { Expenses } = require('../Models/ExpensesMdl.js');
        const data = new Expenses(ExpensesData); // Creating a new Customer instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().EXPNSINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error creating customer' });
    }
});
module.exports = router;