import { Model, DataTypes } from 'sequelize';
import dbConnection from "../dbConnection/dbConnection.js";
import User from './user.js'; 

class Room extends Model {}

Room.init({
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    sequelize: dbConnection,
    modelName: 'Room',
    tableName: 'rooms', 
    timestamps: false 
});

// Definición de la asociación muchos a muchos con User
Room.belongsToMany(User, { through: 'UserRoom', foreignKey: 'room_id' });

export default Room;