const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const dbUtility = require('../dbUtility');
const exeQuery = require('../helpers/exeQuery');
const uploadtemp = require('../helpers/multerconfig'); // Import the multer configuration
const {ftpFile} = require('../helpers/uploadFiles');

const router = express.Router();
router.use(express.json());
//#region User Operations
router.get('/getUsers', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().USRSLIST);
});
router.post('/InsertUsers', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().USRSINSRT);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error inserting Users' });
    }
});

router.post('/UpdateUsers', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().USRSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Users' });
    }
});
//#endregion User Operations

router.get('/getDDl', (req, res) => {
    const {OrgId, LoggedInUser} = req.query;
    const data = { "OrgId": OrgId, "LoggedInUser": LoggedInUser };
    handleRecord(req, res, data, OperationEnums().DDLSELC);
});

//#region User and Role Permissions
router.get('/UserPermissions', (req, res) => {
    const {OrgId, RoleId, ModuleId } = req.query;
    const data = { "OrgId": OrgId, "RoleId":RoleId, "ModuleId": ModuleId };
    handleRecord(req, res, data, OperationEnums().RSECURSEL);
});

router.get('/getmenu', (req, res) => {
    const {OrgId, RoleId } = req.query;
    const JsonData = { "OrgId": OrgId, "RoleId":RoleId };
    exeQuery.GetMenu(JsonData, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        //console.log(results);
        exeQuery.GetMenuNodes(results, (err, MenuList) => {
            if (err) {
                return res.status(500).json({ error: err.message, Status: false });
            }
            res.json({
                ResultData: MenuList,
                Status: true
            });
        });
    });
});
router.post('/UpdateUserMenu', (req, res) => {
    const UpdateJson = req.body; 
     exeQuery.SpSetRoleSecurity(UpdateJson, (error, results) => {
        if (error) {
           res.status(400).send({ error: error.message });
          return;
       }
       res.status(200).send(results);
    });      
});

router.get('/GetStoreSecurity', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().STORESECUREGET);
});
//@OrgId, @UserId, @StoreId, @CreatedBy,
router.post('/UPDTStoreSecurity',  async (req, res) => {
    const data = req.body;
    const { OrgId, UserId, StoreId, IsActive, CreatedBy } = req.body;
    try {
        const UserstoresExist = `select Count(*)As ExistOrNot from dbo.UserStores
        WHERE StoreId = '${StoreId}' AND UserId = ${UserId} AND OrgId = ${OrgId}`;
        const [CheckRecord] = await dbUtility.executeQuery(UserstoresExist);
        console.log(CheckRecord.ExistOrNot);
        if(Number(CheckRecord.ExistOrNot)>0){
            const UpdateUserStores = `update dbo.UserStores set IsActive = ${IsActive},
            UpdatedBy = ${CreatedBy},UpdatedOn = dbo.GetCurrentISTTime() 
            WHERE StoreId = '${StoreId}' AND UserId = ${UserId} AND OrgId = ${OrgId}`;
            await dbUtility.executeQuery(UpdateUserStores);
            res.status(200).json({ message: 'Record updated successfully.' });
        }
        else
        {
            handleRecord(req, res, data, OperationEnums().USRSTRINSR);
        }

    }catch (error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.' });

    }
   
});

//#endregion User and Role Permissions

//#region UPLOADFILES
router.post('/UploadFILES', uploadtemp.single('file'), async (req, res) => {
    try {
        const {OrgId, ReferenceId, ReferenceType } = req.body;
        console.log(req.body);
        const data = req.body;
        const filePath = req.file.path;
        //const fileExtension = path.extname(req.file.originalname);
        const fileName = req.file.originalname;
        const newfilename = `${ReferenceId}_${fileName}`;
        let UpdtFilepath = `ibiz\\${OrgId}\\${ReferenceType}\\${newfilename}`;
        console.log(UpdtFilepath);
        try {
            const uploadResponse = await ftpFile(filePath, OrgId,'IBIZ',ReferenceType, newfilename);
            console.log( uploadResponse);
        } catch (uploadError) {
            return res.status(500).json({ error: 'Error uploading image' });
        }
        data.Filepath = UpdtFilepath; 
        data.FileName = newfilename;
        handleRecord(req, res, data, OperationEnums().UPLODDOCS);
        
    } catch (error) {
        res.status(500).json({ error: 'Error Updating' });
    }
});

router.get('/getDOCS', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETDOCS);// GETDOCS:124 utility enum
});

router.get('/checkSubmitIndent', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETPURSET);// 126 utility enum
});
//end region

router.get('/getPurchaseSettings', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETPURSET);// 126 utility enum
});
router.get('/HeaderNotifys', (req, res) => {
    const data = req.query; 
    handleRecord(req, res, data, OperationEnums().GETNOTIFY); 
});



module.exports = router;