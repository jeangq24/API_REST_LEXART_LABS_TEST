const server = require('./src/app.js');
const { conn, Rol } = require('./src/db.js');
const logger = require('./src/lib/logs.js');

const {
  SERVER_PORT,
  SERVER_HOST,
} = process.env;

const port = SERVER_PORT || 3001;
const host = SERVER_HOST || "127.0.0.1";

conn.sync({ force: true })
  .then(() => {
    server.listen(port, host, async() => {
      logger.info(`Server is listening in: ${host}:${port}`);
      const existingRoles = await Rol.findAll();
      if (existingRoles.length === 0) {

        const defaultRoles = [
          { id: 'admin', status: true },
          { id: 'user', status: true },
        ];

        await Rol.bulkCreate(defaultRoles);
        logger.info('Default roles have been added successfully.');
        
      } else {
        logger.info('Roles already exist in the database.');
      };
    });
  })
  .catch(err => {
    logger.error('Error syncing models or starting server:', err);
  });
