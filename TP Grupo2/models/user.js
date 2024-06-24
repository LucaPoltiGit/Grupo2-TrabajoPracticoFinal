import { Model, DataTypes } from 'sequelize';
import dbConnection from "../dbConnection/dbConnection.js";
import bcrypt from "bcrypt";

class User extends Model {
  async validatePassword(password) {
    const comparePassword = await bcrypt.compare(password, this.password);
    return comparePassword;
  }
}

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

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt();
   user.password = await bcrypt.hash(user.password, salt);
});


export default User;