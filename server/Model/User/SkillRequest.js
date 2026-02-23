import { DataTypes } from 'sequelize';
import sequelize from '../../database/db.js';

const SkillRequest = sequelize.define('SkillRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  skillId: { type: DataTypes.INTEGER, allowNull: false },
  fromUserId: { type: DataTypes.INTEGER, allowNull: false },
  toUserId: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
});

export default SkillRequest;