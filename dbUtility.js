const sql = require('mssql');
require('dotenv').config(); // Load Environment Variables

const sqlConfig = {
    user: process.env[`DBUSER`],//'db_a50d85_ibizaccounts_admin',//'QAIbizuser',
    password: process.env[`DBPWD`],//'p3r3nni@l',//'Y71b0r?0v',
    server: process.env[`SERVER`],//'sql5112.site4now.net',//'132.148.105.23',
    database: process.env[`DBNAME`],//'db_a50d85_ibizaccounts',//'QAiBizAccounts',//'Dev_Posbilling',
    connectionTimeout: 30000, // 30 seconds
    requestTimeout: 30000,   // 30 seconds
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    driver: 'tedious',
    pool: {
		max: 10, // Maximum number of connections in the pool
		min: 0,  // Minimum number of connections in the pool
		idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
	  },
};
// Create a connection pool
const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config:', err);
    throw err;
  });

async function executeQuery(query) {
    try {
        const pool = await poolPromise; // Get the pool
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } 
}
async function executeSP(param,spname, callback) {
  const { orgid } = param;
  const sqlQuery = `
      EXEC ${spname}
      @orgid = '${orgid}'
  `;
  console.log('sqlQuery:', sqlQuery);

  dbUtility.executeQuery(sqlQuery)
      .then(results => callback(null, results))
      .catch(callback);
}
async function executeQueryrowsAffected(query) {
  try {
      const pool = await poolPromise; // Get the pool
      const result = await pool.request().query(query);
      return result.rowsAffected;
  } catch (err) {
      console.error('Error executing query:', err);
      throw err;
  } 
}

async function executeForMultipleDS(query) {
    try {
        const pool = await poolPromise; // Get the pool
        const result = await pool.request().query(query);
         // Handle multiple result sets
         const datasets = result.recordsets;
         // Log the datasets
         // Define dataset names
        const datasetNames = ['data', 'headers', 'reportinfo']; // Adjust based on your stored procedure's result sets

        // Initialize an object to store the named datasets
        const namedDatasets = {};

        // Assign each dataset to its corresponding name
        result.recordsets.forEach((dataset, index) => {
            if (datasetNames[index]) {
                namedDatasets[datasetNames[index]] = dataset;
            } else {
                namedDatasets[`UnnamedDataset${index + 1}`] = dataset;
            }
        });
        // return the named datasets
        return namedDatasets;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } 
}

// Closing the pool when your application exits (if needed)
process.on('exit', async () => {
    try {
      const pool = await poolPromise;
      await pool.close();
      console.log('Connection pool closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error closing the pool:', err);
      process.exit(1);
    }
  });

module.exports = {
    executeQuery,
    executeForMultipleDS,
    executeQueryrowsAffected,
    executeSP
};
