import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';
import bcrypt from 'bcrypt';

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
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
}, {
  tableName: 'Users',
  freezeTableName: true,
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;