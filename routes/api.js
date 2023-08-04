const express = require('express');
const router = express.Router();
const {sheets}= require('../controllers/xslx_reader');
const {querys} = require('../controllers/querys');
const {poolPromise} = require('../database/db');

router.get('/sorteo', (req, res) =>{
    res.render('sorteo');
});

router.get('/carga', (req, res) =>{
    res.render('carga');
});

router.get('/carga_masiva', (req, res) =>{
    res.render('carga_masiva');
});

router.post('/carga_masiva', async (req,res) => {
    try{
        const pool = await poolPromise;
        
    }catch(error){
        console.log('Error en esta carga masiva mi rey');
        console.log(error);
    };
});

router.get('/records', async (req, res) => {
    try{
        const pool = await poolPromise;
        const result = await pool.request().query(querys.getAllRecords);
        console.log(result);
        res.json(result.recordset);
    }catch(error){
        console.log('Error en este controlador mi rey');
        console.log(error.message);
    };
});

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
            tablesNames.push(record.name);
        })
        console.log(tablesNames); 
        if(!affectedRows[0]){
            console.log('There are not tables');
            res.send('No tables');            
        }else{            
            res.json({tablesNames});
        }
    } catch (error) {
        console.log('Error en este controlador mi rey')
        console.log(error.message);
    }
  });

router.ws('/echo', (ws, res) => {
    
    ws.on('message', msg => {
        console.log('Mensaje recibido: ', msg);
        ws.send(msg);
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
});

router.ws('/other', (ws, res) => {
    
    ws.on('message', msg => {
        console.log('Mensaje recibido: ', msg);
        ws.send(msg);
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
}); 

module.exports = router;