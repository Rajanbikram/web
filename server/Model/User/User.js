import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  mode: {
    type: DataTypes.ENUM('Learn Skills', 'Teach Skills', 'Both Learn & Teach'),
    defaultValue: 'Both Learn & Teach',
  },
  password: { type: DataTypes.STRING, allowNull: false },
  averageRating: { type: DataTypes.FLOAT, defaultValue: 0 },
});

export default User;