import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';

const AdminReport = sequelize.define('AdminReport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  skillTitle: { type: DataTypes.STRING, allowNull: false },
  reportedBy: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'resolved', 'dismissed'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'admin_reports',
  timestamps: false,
});

export default AdminReport;