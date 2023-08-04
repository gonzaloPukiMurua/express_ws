module.exports = {
    config : {
        server: "DESKTOP-MPIKJC5", // or "localhost"
        user: process.env.DB_USER || 'newuser',
        password: process.env.DB_PWD || 'password-test',
        database: process.env.DB_NAME || 'example_database',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
}