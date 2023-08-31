import {poolPromise} from './src/database/db.js';
//import {indice_sorteo, indice_ganadores, indice_licitaciones} from './src/utils/db_index.js';
let indice_sorteo = 0;
let idSocketResultados = '';

export default (io) => {
    io.on('connection',(socket) => { 
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('User disconnected.')
        });

        socket.on('id:resultados', (id) => {
            idSocketResultados = id;
            console.log('Id de socket resultados: ',idSocketResultados);         
        });

        socket.on('control', async (accion)=>{ 
            console.log('hubo un click desde control.')           
            if(accion === 'siguiente'){
                console.log('Estoy en el if')
                indice_sorteo += 1;
            }
            else if(accion === 'anterior'){
                if(indice_sorteo >0){
                    indice_sorteo -= 1;
                }                
            };
            console.log(indice_sorteo);
            console.log('Id del socket a emitir: ', idSocketResultados);
            const pool = await poolPromise;
            const resultados = await pool.query(`SELECT AuxGrafBolillaNumero, AuxGrafBolillaPosicion FROM [dbo].[AuxGrafBolillas] where AuxGrafBolillaNumero = ${indice_sorteo}`);
            const {AuxGrafBolillaNumero : orden, AuxGrafBolillaPosicion : bolilla} = resultados.recordset[0];
            console.log('Orden: ', orden, '|', ' Bolilla: ', bolilla);
            socket.to(idSocketResultados).emit('db:resultados', {orden, bolilla});            
        });
    });
}