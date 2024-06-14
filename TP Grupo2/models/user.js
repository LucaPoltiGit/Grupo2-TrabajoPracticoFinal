import { Model, DataTypes } from 'sequelize';
import dbConnection from "../dbConnection/dbConnection.js";

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize: dbConnection,
  modelName: 'User'
});

export default User;