export const config = {
    server: "DESKTOP-FG1T05V", // or "localhost"
    user: process.env.DB_USER || 'test_user',
    password: process.env.DB_PWD || 'JhonnyJoestar89',
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
};