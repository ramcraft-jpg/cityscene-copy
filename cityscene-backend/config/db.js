import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL connected successfully");
    console.log(`📦 Database: ${process.env.DB_NAME}`);

    await sequelize.sync();
    console.log("✅ MySQL tables synchronized successfully");
  } catch (error) {
    console.error("❌ MySQL connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;