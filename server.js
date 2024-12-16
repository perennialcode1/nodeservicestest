require('dotenv').config();
const express = require('express');
const logger = require('./helpers/logger'); // Import the logger
const cors = require("cors");
const ProductRoutes = require('./routes/ProductServices.js');
const CustomerRoutes = require('./routes/CustomerServices.js');
const SettingsRoutes = require('./routes/SettingsServices.js');
const InventoryRoutes = require('./routes/InventoryServices.js');
const SalesRoutes = require('./routes/SalesService.js');
const AdminRoutes = require('./routes/AdminServices.js');
const DashboardRoutes = require('./routes/DashboardService.js');
const MiscRoutes = require('./routes/MiscService.js');
const AuthRoutes = require('./routes/AuthService.js');
const ReportRoutes = require('./routes/ReportService.js');
const ExcelsRoutes = require('./routes/ExcelServices.js');
const SupplierRoutes = require('./routes/SupplierServices.js');
const LogRoutes = require('./routes/logServices.js');
const POSRoutes = require('./routes/POSServices.js');
const MobileSVCRoutes = require('./MobileSVC/IBIZAppServices.js')

//const { handleRecord } = require('./helpers/RecordHandler');
//const { OperationEnums } = require('./helpers/utilityEnum.js');
const exeQuery = require('./helpers/exeQuery');

const app = express();

app.use(cors());

app.use(express.json());
// Middleware to log incoming requests
app.use((req, res, next) => {
    const { method, url, body, query, params } = req;
    logger.info({
      message: 'Incoming request',
      method,
      url,
      body,
      query,
      params,
    });
    next();
});

app.use('/Product', ProductRoutes);
app.use('/Customer', CustomerRoutes);
app.use('/Settings', SettingsRoutes);
app.use('/Inventory', InventoryRoutes);
app.use('/Billing', SalesRoutes);
app.use('/Admin', AdminRoutes);
app.use('/Dashboard',DashboardRoutes);
app.use('/Misc',MiscRoutes);
app.use('/Auth',AuthRoutes);
app.use('/Report',ReportRoutes);
app.use('/Excels',ExcelsRoutes);
app.use('/supplier',SupplierRoutes);
app.use('/logs',LogRoutes);
app.use('/POS',POSRoutes);
app.use('/MobileSVC',MobileSVCRoutes);

app.get('/GetPrivacyPolicy', async (req, res) => {
    try {
        const privacyPolicyLink = "https://ibizaccounts.com/privacy%20policy.html";
        res.json({ ResultData: privacyPolicyLink });
    } catch (error) {
        next(error);
    }
});
app.get('/GetTermAndConditions', async (req, res) => {
    try {
        const termsAndConditionsLink = "https://ibizaccounts.com/terms%20&%20conditions.html";
        res.json({ ResultData: termsAndConditionsLink });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

// app.post('/AddPOToStock', (req, res) => {
//     const POToStock = req.body; 
//     exeQuery.SpAddPOToStock(POToStock, (error, results) => {
//         if (error) {
//             res.status(400).send({ error: error.message });
//             return;
//         }
//         res.status(200).send(results);
//     });      
// });

// app.post('/DelExpenses', (req, res) => {
//     const { Id } = req.body;
//     const data = { "Id": Id };
//     handleRecord(req, res, data, OperationEnums().EXPNSDELT);
// });
// app.post('/UpdateExpenses', async (req, res) => {
//     try {
//         const ExpensesData = req.body; // Assuming req.body contains the customer data
//         const { Expenses } = require('./Models/ExpensesMdl');
//         const data = new Expenses(ExpensesData); // Creating a new Customer instance
//         handleRecord(req, res, data, OperationEnums().EXPNSUPDT);
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Error creating customer' });
//     }
// });
// Error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
    const message = err.message || 'Internal Server Error';
    const status = false;
    // Log the error using the same logger instance
    logger.error({
      message: 'Error occurred',
      error: message, // Log the custom error message
      stack: err.stack, // Log the stack trace for debugging
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Send a custom error response to the client
    res.status(statusCode).json({ error: message, Status: status });
  });

  
module.exports = app;

/*const PORT = 3007; 
app.listen(PORT, '192.168.1.10', () => {
     console.log(`Server is running on port ${PORT}`);
 });
*/
const port = process.env.PORT || 3009;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});