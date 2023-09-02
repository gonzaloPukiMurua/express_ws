const socket = io();
const bolillaSorteo = document.getElementById('bolilla');
const ordenSorteo = document.getElementById('orden');   

socket.on("connect", () => {
  socket.emit('id:resultados', socket.id); // "G5p5..."
});

socket.on('timer', (msg) => {
  console.log(msg);
});

socket.on('db:resultados', (resultados) => {
  const {orden, bolilla} = resultados;
  console.log('Recibido: ', orden, bolilla);
  console.log(bolillaSorteo.innerText);
  console.log(ordenSorteo.innerText);
  bolillaSorteo.innerText = bolilla;
  ordenSorteo.innerText = orden;
});