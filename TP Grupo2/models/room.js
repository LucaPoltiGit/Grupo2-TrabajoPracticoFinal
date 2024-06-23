import { Model, DataTypes } from 'sequelize';
import dbConnection from '../dbConnection/dbConnection.js'; // Asegúrate de importar tu conexión Sequelize correctamente

class Room extends Model {}

Room.init({
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize: dbConnection,
    modelName: 'Room'
});
  
export default Room;