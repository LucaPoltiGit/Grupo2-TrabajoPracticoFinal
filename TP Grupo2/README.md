# Proyecto Final: Aplicación de Juego en Línea

Este proyecto es una aplicación de juego 4 en línea que utiliza Node.js, Express, Socket.IO y Sequelize. Los usuarios pueden registrarse, iniciar sesión, unirse a salas de juego y jugar en tiempo real.

# Tabla de Contenidos
- Instalación
- Uso
- Rutas
- Tecnologías Utilizadas
- Estructura del Proyecto
- Integrantes

# Instalación
- Clona este repositorio:

    git clone https://github.com/tu-usuario/tu-repositorio.git

- Instala las dependencias:

    npm install

- Crea un archivo .env en el directorio raíz con las siguientes variables de entorno:

    SERVER_PORT=8080
    DB_NAME="4enLinea"
    DB_USER="admin"
    DB_PASSWORD="admin123"
    DB_HOST="localhost"
    DB_DIALECT="mysql"
    DB_PORT=3306

- Inicia la aplicación:

    npm run dev

# Uso
Para usar la aplicación, abre tu navegador y navega a http://localhost:8080/api. 
Puedes registrarte, iniciar sesión y unirte a una sala de juego.

# Rutas 
- Registro
    URL: /api/auth/register

    Método: POST

    Descripción: Registra un nuevo usuario.

    Body:
        {
            "name":"",
            "email":"",
            "password":""
        }

    name: Nombre del usuario.
    email: Correo electrónico del usuario.
    password: Contraseña del usuario.

- Inicio de Sesión
    URL: /api/auth/login

    Método: POST

    Descripción: Inicia sesión en la aplicación.

    Body:
        {
            "email":"",
            "password":""
        }

    email: Correo electrónico del usuario.
    password: Contraseña del usuario.

- Cierre de Sesión
    URL: /api/auth/logout

    Método: POST

    Descripción: Cierra la sesión del usuario.

- Agregar user a room
    URL: /api/room/agregarJugador

    Método: POST

    Descripción: Agrega a un suer a una room

    Body:
        {
            "user_id": number,
            "room_id": number,
        }

- Agregar puntaje a user
    URL: /api/users/agregarPuntaje

    Método: PUT

    Descripción: Le suma puntos al user

    Body:
        {
            "points": number
        }

    email: Correo electrónico del usuario.
    password: Contraseña del usuario.

# Tecnologías Utilizadas
    Node.js
    Express
    Socket.IO
    Sequelize
    MySQL
    JSON Web Tokens 
    Bcrypt

# Estructura del Proyecto
.
├── config
│   └── config.js
├── controller
│   └── roomController.js
│   └── userController.js
├── dbConnection
│   └── dbConnection.js
├── middleware
│   └── validateLogin.js
├── models
│   └── models.js
│   └── room.js
│   └── user.js
├── routes
│   ├── auth.routes.js
│   └── index.js
│   └── rooms.routes.js
│   └── users.routes.js
├── utils
│   └── jwt.js
├── app.js
├── package.json
└── .env

# Integrantes
- LucaPoltiGit
- IairFei
- martinchichi
- SergioCusa