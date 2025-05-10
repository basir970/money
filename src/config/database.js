import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Ensure this line is present to load .env in local development

console.log(`Loading DATABASE_URL: ${process.env.DATABASE_URL || 'Not Defined'}`);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not defined.');
  throw new Error('DATABASE_URL environment variable is required but not set.');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

export const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

export default sequelize;
