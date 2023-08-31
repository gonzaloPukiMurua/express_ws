const socket = io();
const fase_1 = document.getElementById('fase_1');
const fase_2 = document.getElementById('fase_2');
const fase_3 = document.getElementById('fase_3');
const reproducir = document.getElementById('reproducir');
const pausar = document.getElementById('pausar');
const reiniciar = document.getElementById('reiniciar'); 
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');

fase_1.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Ir a Fase 1.');
  socket.emit('control', 'fase_1');
});

fase_2.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Ir a Fase 2.');
  socket.emit('control', 'fase_2');
});

fase_3.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Ir a Fase 3.');
  socket.emit('control', 'fase_3');
});

reproducir.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Reproducir bolillas por orden.');
  socket.emit('control', 'reproducir');
});

pausar.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Pausar visualizacion.');
  socket.emit('control', 'pausar');
});

reiniciar.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Reiniciar visualizacion.');
  socket.emit('control', 'reiniciar');
});

siguiente.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Buscar resultado siguiente ganador.');
  socket.emit('control', 'siguiente');
});

anterior.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Buscar resultado ganador anterior.');
  socket.emit('control', 'anterior');
});

