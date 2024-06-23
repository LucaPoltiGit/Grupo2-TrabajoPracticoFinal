import { Model, DataTypes } from 'sequelize';
import dbConnection from "../dbConnection/dbConnection.js";

class Room extends Model {}

Room.init({
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},
{
    sequelize: dbConnection,
    modelName: 'Room',
    tableName: 'rooms', 
    timestamps: false 
}
);

export default Room;