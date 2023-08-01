const express = require('express');
const router = express.Router();
const {sheets}= require('./xslx_reader');
const {querys} = require('./querys');
const {poolPromise} = require('./db');

router.get('/tables', async (req,res) => {
    console.log('En api/tables')
    try {
        console.log(querys.getAllTables)
        const pool = await poolPromise;
        const result = await pool.request().query(querys.getAllTables);
        const affectedRows = result.rowsAffected;
        console.log(result);
        console.log(affectedRows);
        console.log(affectedRows[0]);
        if(!affectedRows[0]){
            console.log('There are not tables');
            res.send('No tables');            
        }else{
            console.log(result);
            res.json({result});
        }
    } catch (error) {
        console.log('Error en este controlador mi rey')
        console.log(error.message);
    }
  });

//router.ws('/', (req, res))

module.exports = router;