const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
router.use(express.json());
// Route to display the log file content
router.get('/view-log', (req, res) => {
    var query = require('url').parse(req.url,true).query;
    var datestr = query.dt;
    const logFilePath = path.join('logs',`requests-${datestr}.log`);
  
    // Check if the log file exists
    fs.access(logFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('<h2>Log file not found.</h2>');
      }
  
      // Read the log file content
      fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading log file:', err);
          return res.status(500).send('<h2>Error reading log file.</h2>');
        }
  
        // Sanitize the log content to prevent XSS
        const sanitizedData = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
        // Render the log content on an HTML page
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>View Log File</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              pre { background-color: #f4f4f4; padding: 20px; border: 1px solid #ddd; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h1>Log File Content</h1>
            <pre>${sanitizedData}</pre>
          </body>
          </html>
        `);
      });
    });
  });


module.exports = router;