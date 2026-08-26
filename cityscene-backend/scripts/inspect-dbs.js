import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize("", dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: false,
});

async function inspectDatabases() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL server.");
    const [dbs] = await sequelize.query("SHOW DATABASES;");
    console.log("Databases on MySQL server:", dbs.map(d => d.Database));

    for (const dbRow of dbs) {
      const dbName = dbRow.Database;
      if (dbName.includes("cityscene") || dbName.includes("global") || dbName.includes("site") || dbName.includes("test")) {
        console.log(`\n--- Inspecting database: ${dbName} ---`);
        try {
          const [tables] = await sequelize.query(`SHOW TABLES FROM \`${dbName}\`;`);
          console.log(`Tables in ${dbName}:`, tables.map(t => Object.values(t)[0]));
          
          for (const t of tables) {
            const tableName = Object.values(t)[0];
            const [countRes] = await sequelize.query(`SELECT COUNT(*) as cnt FROM \`${dbName}\`.\`${tableName}\`;`);
            console.log(`  Table ${tableName}: ${countRes[0].cnt} rows`);
          }
        } catch (e) {
          console.log(`Error inspecting ${dbName}: ${e.message}`);
        }
      }
    }
  } catch (err) {
    console.error("Error inspecting MySQL server:", err.message);
  } finally {
    await sequelize.close();
  }
}

inspectDatabases();
