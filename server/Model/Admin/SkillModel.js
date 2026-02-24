import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';

const AdminSkill = sequelize.define('AdminSkill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  postedBy: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM('active', 'pending', 'rejected'),
    defaultValue: 'active',
  },
}, {
  tableName: 'admin_skills',
  timestamps: false,
});

export default AdminSkill;