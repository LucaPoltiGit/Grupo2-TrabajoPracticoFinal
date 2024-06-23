import { Model, DataTypes } from 'sequelize';
import dbConnection from '../dbConnection/dbConnection.js'; // Asegúrate de importar tu conexión Sequelize correctamente

class UserRoom extends Model {}

UserRoom.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize: dbConnection,
    modelName: 'UserRoom',
    tableName: 'users_rooms', 
    timestamps: false 
});

export default UserRoom;