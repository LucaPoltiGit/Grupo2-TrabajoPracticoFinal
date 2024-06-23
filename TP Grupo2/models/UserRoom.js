import { Model, DataTypes } from 'sequelize';
import dbConnection from '../dbConnection/dbConnection.js';

class UserRoom extends Model {}

UserRoom.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'User', 
            key: 'user_id' 
        }
    },
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Room', // Nombre del modelo al que se hace referencia
            key: 'room_id' // Nombre de la columna en la tabla Room
        }
    }
}, {
    sequelize: dbConnection,
    modelName: 'UserRoom',
    tableName: 'users_rooms', // Nombre de la tabla intermedia
    timestamps: false // No necesitamos timestamps en esta tabla de unión
});

export default UserRoom;
