import reader from 'xlsx';
import file from '../helpers/xslx_reader.js';
//import {querys} from '../helpers/querys.js';
import {poolPromise} from '../database/db.js';

export const masiveLoad = async (req,res) => {
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
}