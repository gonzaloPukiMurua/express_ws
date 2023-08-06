const express = require('express');
const reader = require('xlsx');
const router = express.Router();
const {file}= require('../controllers/xslx_reader');
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
        const tables = file.SheetNames;
        for(let i = 0; i < tables.length; i++){            
            const table = tables[i];
            const tableRecords = reader.utils.sheet_to_json(file.Sheets[table], {header: 1});
            const header = tableRecords.shift();            
            console.log(`Esta tabla es: ${table}`);
            console.log(`Sus columnas son: ${header}`);
            console.log(`Hay ${tableRecords.length} registros en esta tabla.`);
            for(let k = 0; k < tableRecords.length; k++){
                record = tableRecords[k];
                let queryValues = [];
                //console.log('Cantidad de columnas: ', header.length, header);
                //console.log(record);
                for(let j=0; j < header.length; j++){
                    if(record[j] === undefined){
                        record[j]='';
                    }              
                    if(typeof record[j] === "string"){                       
                        queryValues.push("\'" + record[j] + "\'");                        
                    }else{
                        queryValues.push(record[j]);
                    }
                }
                console.log(`INSERT INTO ${table} (${header.toString()}) VALUES (${queryValues});`);
                const pool = await poolPromise;
                await pool.query(`INSERT INTO ${table} (${header}) VALUES (${queryValues});`);
            }                      
        }        
        res.redirect('/api/tables');        
    }catch(error){
        console.log('Error en esta carga masiva mi rey');
        console.log(error);
    };
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