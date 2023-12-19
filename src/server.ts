// src/server.ts
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import ioClient from 'socket.io-client';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const remoteSocket = ioClient(process.env.SOCKET_SERVER_URL || 'http://localhost:3001');

app.get('/', (req, res) => {
  res.send('Servidor do Jogo da Velha');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT}`);
});

remoteSocket.on('connect', () => {
  console.log('Conectado ao servidor remoto');
});

remoteSocket.on('disconnect', () => {
  console.log('Desconectado do servidor remoto');
});

remoteSocket.on('updateBoard', (newBoard: string[]) => {
  remoteSocket.emit('updateBoard', newBoard);
});

remoteSocket.on('switchPlayer', () => {
  remoteSocket.emit('switchPlayer');
});

remoteSocket.on('gameOver', (result: { message: string }) => {
  console.log(result.message);
});

io.on('connection', (socket: any) => {
  console.log('Um usuário conectou');

  socket.on('disconnect', () => {
    console.log('Um usuário desconectou');
  });
});
