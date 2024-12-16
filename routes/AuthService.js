const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const dbUtility = require('../dbUtility.js');
const exeQuery = require('../helpers/exeQuery.js');

const router = express.Router();
router.use(express.json());

//#region Login Service
router.post('/SignIn', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        handleRecord(req, res, data, OperationEnums().SIGNIN);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Users' });
    }
});
router.post('/ChangePassword', async (req, res) => {
    try {
        const { NewPassword, Name, OldPassword, OrgId } = req.body;
        console.log(req.body);
        const ChangePassword = `update dbo.Users SET Password = '${NewPassword}'
        where Name = '${Name}' AND Password = '${OldPassword}'  AND OrgId = ${OrgId}`;
        const results = await dbUtility.executeQueryrowsAffected(ChangePassword);
        if (results[0] == 0) {
            return res.status(200).json({ message: 'User not found or old password incorrect', Status: false });
        }else {
            res.status(200).json({ message: 'Password changed successfully', Status: true });
        }
       
    } catch (error) {
        res.status(200).json({ message: 'Error updating password', Status: false });
    }
});

//#endregion Login Service
module.exports = router;