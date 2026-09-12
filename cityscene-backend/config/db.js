import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "cityscene_global";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL connected successfully");
    console.log(`📦 Database: ${dbName}`);

    await sequelize.sync({ alter: true });
    console.log("✅ MySQL tables synchronized successfully");
  } catch (error) {
    console.error("❌ MySQL connection failed:");
    console.error(error.message);
    if (error.name === 'SequelizeAccessDeniedError') {
      console.error("\n💡 Database Access Denied Troubleshooting:");
      console.error("1. Open cityscene-backend/.env");
      console.error("2. Update DB_USER and DB_PASSWORD to match your local MySQL server setup.");
    }
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;