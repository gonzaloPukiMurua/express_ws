import {poolPromise} from './src/database/db.js';
import { TimerFunction } from './src/lib/timer.js';
let idSocketResultados = '';
let raffleIndex = 0;
let timer;
//timer = new TimerFunction(console.log('Se a acabado el tiempo.'), 2000);
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

        socket.on('conmutador', async (phase)=>{ 
            console.log('Cambio de etapa.');

            });

        socket.on('sorteo', async (action) => {            
            switch (action){
                case 'reproducir':                    
                    //socket.to(idSocketResultados).emit('timeout', 'Se a acabado el tiempo!');
                    break;
                case 'pause':
                    //timer.pause();
                    break;
                case 'reiniciar':
                    
                default:    
            }

        });

        socket.on('control', async (action) => {
            switch (action){
                case 'siguiente':
                case 'anterior':
                default:    
            }
        });
            /*if(accion === 'siguiente'){
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
            socket.to(idSocketResultados).emit('db:resultados', {orden, bolilla}); */           
        
    });
};