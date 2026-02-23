import User from './User.js';
import Skill from './Skill.js';
import SkillRequest from './SkillRequest.js';
import Message from './Message.js';
import Review from './Review.js';

// User <-> Skill
User.hasMany(Skill, { foreignKey: 'userId', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'userId' });

// User <-> SkillRequest
User.hasMany(SkillRequest, { foreignKey: 'fromUserId', as: 'SentRequests' });
User.hasMany(SkillRequest, { foreignKey: 'toUserId', as: 'ReceivedRequests' });
SkillRequest.belongsTo(User, { foreignKey: 'fromUserId', as: 'FromUser' });
SkillRequest.belongsTo(User, { foreignKey: 'toUserId', as: 'ToUser' });
SkillRequest.belongsTo(Skill, { foreignKey: 'skillId' });

// User <-> Message
User.hasMany(Message, { foreignKey: 'senderId', as: 'SentMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

// User <-> Review
User.hasMany(Review, { foreignKey: 'teacherId', as: 'ReceivedReviews' });
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'GivenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'Reviewer' });
Review.belongsTo(User, { foreignKey: 'teacherId', as: 'Teacher' });

export { User, Skill, SkillRequest, Message, Review };