import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "renteasynepal",
  "postgres",
  "Rajanbikram@123",
  {
    host: "localhost",
    dialect: "postgres",
    logging: true
  }
);

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");

    // ✅ Use alter: true to update existing tables
    await sequelize.sync({ alter: true });
    console.log("✅ All tables synced successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};


export default sequelize;