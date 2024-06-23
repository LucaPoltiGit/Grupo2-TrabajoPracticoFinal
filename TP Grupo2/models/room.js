import { Model, DataTypes } from 'sequelize';
import dbConnection from "../dbConnection/dbConnection.js"; // Ajusta la ruta según tu estructura de archivos
import User from './user.js'; // Ajusta la ruta según tu estructura de archivos

class Room extends Model {}

Room.init({
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Otros campos de la sala, según sea necesario
}, {
    sequelize: dbConnection,
    modelName: 'Room',
    tableName: 'rooms', // Nombre de la tabla en la base de datos
    timestamps: false // No necesitamos timestamps en este modelo
});

// Definición de la asociación muchos a muchos con User
Room.belongsToMany(User, { through: 'UserRoom', foreignKey: 'room_id' });

export default Room;