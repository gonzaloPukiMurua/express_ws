import express from 'express';
import {
    masiveLoad,

} from '../controllers/dataLoad.controllers.js'
const router = express.Router();


router.get('/carga', (req, res) =>{
    res.render('carga');
});

router.get('/carga_masiva', (req, res) =>{
    res.render('carga_masiva');
});

router.post('/carga_masiva', masiveLoad);

router.get('/tables', async (req,res) => {
    console.log('En api/tables')
    try {
        
        const pool = await poolPromise;
        const result = await pool.request().query(querys.getAllTables);
        console.log(typeof result);
        const affectedRows = result.rowsAffected;
        const userTables = result.recordset.filter(record => record.name != 'sysdiagrams');
        const tablesNames = [];
        userTables.forEach((record) => {
            tablesNames.push({'name' : record.name});
        })
        console.log(tablesNames); 
        if(!affectedRows[0]){
            console.log('There are not tables');
            res.send('No tables');            
        }else{            
            res.render('tablas',{tablesNames});
        }
    } catch (error) {
        console.log('Error en este controlador mi rey')
        console.log(error.message);
    }
  });

router.get('/records/:table', async (req, res) => {
    const table = req.params.table;
    try{
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT TOP(500) * FROM [dbo].[${table}]`);
        console.log(result);
        res.json(result.recordset);
    }catch(error){
        console.log('Error en este controlador mi rey');
        console.log(error.message);
    };
});

export default router;