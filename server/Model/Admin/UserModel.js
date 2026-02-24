import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';

const AdminUser = sequelize.define('AdminUser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  skills: { type: DataTypes.INTEGER, defaultValue: 0 },
  joinDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM('active', 'blocked'),
    defaultValue: 'active',
  },
}, {
  tableName: 'admin_users',
  timestamps: false,
});

export default AdminUser;