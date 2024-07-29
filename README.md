# API_REST_LEXART_LABS_TEST
REST API DEVELOPED BY JEAN GARZON



# REST API con Node.js, Express, Sequelize y PostgreSQL

Este proyecto es una API RESTful desarrollada con Node.js, Express, Sequelize y PostgreSQL. La API permite realizar operaciones CRUD y está documentada con Swagger.

## Configuración del Entorno de Desarrollo

### Instalación de Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando:

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

```env
DB_USER=postgres # usuario del servidor postgres
DB_PASSWORD=postgres # contraseña del usuario postgres
DB_HOST=localhost # host de la conexión
DB_NAME=shoptest # nombre de la base de datos
ENV_DEV=true # configuración del modo desarrollo en true
```

Estas variables son por defecto y pueden ajustarse según tu configuración.

## Ejecución del Servidor

Una vez configurado el entorno, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm start
```

El servidor se ejecutará en el puerto `3001`. Verifica la consola para confirmar que el servidor se ha iniciado correctamente:

```json
{"level":"info","message":"Server is listening at port 3001","timestamp":"2024-06-20T06:11:05.695Z"}
```

Los logs se registrarán en un archivo llamado `combined.log` en la carpeta `RAIZ`.

## Documentación de la API

El servidor expone un endpoint exclusivo para visualizar la documentación realizada con Swagger, la cual define los endpoints disponibles y el modelado de la base de datos. La documentación se encuentra en la ruta:

- Desarrollo: [http://localhost:3001](http://localhost:3001/)
- Producción: [https://api-rest-lexart-labs-test.onrender.com/](https://api-rest-lexart-labs-test.onrender.com/)

## Despliegue

Actualmente, el proyecto se encuentra desplegado en [Render](https://render.com):

- Host: [https://api-rest-lexart-labs-test.onrender.com/](https://api-rest-lexart-labs-test.onrender.com/)

### Nota sobre Vercel

Se intentó integrar la API REST a Vercel, lo cual generó inconvenientes con los módulos `swagger-ui-express` y `swagger-jsdoc`, además de problemas para cargar las rutas. Por esta razón, se optó por subir el proyecto en otro servicio.

## Comentarios Adicionales

Si tienes algún problema o pregunta sobre la configuración o el uso del proyecto, no dudes en abrir un issue o contactarnos.
