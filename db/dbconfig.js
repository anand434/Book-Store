require('dotenv').config()


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: 'localhost', 
    port: 1434,
    database: 'test',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
      }
}; 

module.exports = config;