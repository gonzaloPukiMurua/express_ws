import { TimerFunction } from './src/lib/timer.js';
import { raffleController } from './src/controllers/socket.controllers.js';
import events from 'events';

let idSocketResultados = '';
let raffleIndex = 0;

export default (io) => {
    
    io.on('connection',(socket) => { 
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('User disconnected.')
        });

        const timerEvents = new events.EventEmitter();
        let timer;
        timerEvents.on('startTimer', () => {
            timer = setInterval(async () => {
                raffleIndex += 1;
                const query = await raffleController(raffleIndex);  
                console.log(query);
                const {orden, bolilla} = query;              
                console.log(`El timer se ha acabado. Orden: ${orden} | Bolilla: ${bolilla}`);
                socket.to(idSocketResultados).emit('db:resultados', {orden, bolilla});
            }, 5000);
        });
        timerEvents.on('pauseTimer', () => clearInterval(timer));

        socket.on('id:resultados', (id) => {
            idSocketResultados = id;
            console.log('Id de socket resultados: ',idSocketResultados);         
        });

        socket.on('conmutador', async (phase)=>{ 
            console.log('Cambio de etapa.');
            console.log(phase);
            });    

        socket.on('sorteo', async (action) => {            
            switch (action){
                case 'reproducir':
                    console.log(action);                    
                    socket.to(idSocketResultados).emit('timer', 'Reproducir sorteo.');
                    timerEvents.emit('startTimer');
                    break;
                case 'pausar':
                    console.log(action);                    
                    socket.to(idSocketResultados).emit('timer', 'Pausar sorteo.');
                    timerEvents.emit('pauseTimer');
                    break;
                case 'reiniciar':
                    break;
                    
                default:  
                    break;  
            }
        });
        
        socket.on('control', async (action) => {
            switch (action){
                case 'siguiente':
                    break;
                case 'anterior':
                    break;
                default:  
                    break;  
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