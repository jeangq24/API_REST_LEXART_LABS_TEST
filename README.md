# API_REST_LEXART_LABS_TEST
REST API DEVELOPMENT BY JEAN GARZON

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
DB_USER=postgres # usuario del servidor postgres *
DB_PASSWORD=postgres # contraseña del usuario postgres *
DB_HOST=localhost # host de la conexión *
DB_NAME=shoptest # nombre de la base de datos *
ENV_DEV=true # configuración del modo desarrollo en true
CLIENT_HOST=http://localhost:3000 # cliente host (valida la conexion de cors, en caso de no especificar queda abierto a todos los dominios)
SERVER_PORT=3001 # servidor puerto (en caso de no pasar por defecto sera el puerto 3001)
SERVER_HOST=http://localhost:3001  # servidor host
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

## Características del API

### Encriptación de Contraseñas

El API utiliza bcrypt para encriptar las contraseñas antes de almacenarlas en la base de datos, asegurando así la seguridad de los datos sensibles.

### Autenticación con Tokens

La autenticación se maneja mediante tokens JWT (JSON Web Tokens). Al consumir endpoints protegidos, es necesario proporcionar un token válido en los encabezados de las solicitudes.

### Manejador de Errores

El API incluye un manejador de errores centralizado que captura y gestiona las excepciones, proporcionando respuestas claras y coherentes al cliente.

### Manejador de Rutas No Encontradas

Las rutas no definidas en el API son gestionadas por un middleware específico que retorna un error 404, indicando que la ruta no ha sido encontrada.

### Registro de Logs

El sistema de registro de logs guarda información detallada de las operaciones del servidor, incluyendo:

- Tipo de log (info, error, etc.)
- Contenido del log
- Fecha y hora del log

Estos logs se almacenan en el archivo `combined.log` en la carpeta `API`.

### Validaciones

Las validaciones se implementan tanto en la definición de modelos como en las solicitudes (requests) disponibles. Esto garantiza la integridad y consistencia de los datos que se manejan.

## Documentación de la API

El servidor expone un endpoint exclusivo para visualizar la documentación realizada con Swagger, la cual define los endpoints disponibles y el modelado de la base de datos. La documentación se encuentra en la ruta:

- Desarrollo: [http://localhost:3001](http://localhost:3001)
- Producción: [https://api-rest-lexart-labs-test.onrender.com/](https://api-rest-lexart-labs-test.onrender.com/)

## Despliegue

Actualmente, el proyecto se encuentra desplegado en [Render](https://render.com):

- Host: [https://api-rest-lexart-labs-test.onrender.com/](https://api-rest-lexart-labs-test.onrender.com/)

## Comentarios Adicionales

Si tienes algún problema o pregunta sobre la configuración o el uso del proyecto, no dudes en abrir un issue o contactarnos.
