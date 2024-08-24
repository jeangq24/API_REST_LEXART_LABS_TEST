const { Server } = require('socket.io');
const logger = require('./logs');
let io;

const initializeSockets = (socketServer) => {
  io = new Server(socketServer, {
    cors: {
      origin: '*', // Cambia '*' por tu dominio en producción
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket) => {
    logger.info("[SOCKET] - New client connected");
    socket.on('disconnect', () => {
      logger.info('[SOCKET] - Client disconnected');
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initializeSockets, getIo };
