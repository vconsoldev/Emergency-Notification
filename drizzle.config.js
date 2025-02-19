module.exports = {
    schema: "./models",
    dialect: "postgresql",  
    out: "./migrations",  
    dbCredentials: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "pass@123",
      database: "emergency_notification",
      ssl: false,
    }
  };
  