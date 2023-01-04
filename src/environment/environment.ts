export const environment = {
    MySQLConfig: {
      host: process.env.MY_SQL_URL || "localhost",
      user: process.env.MY_SQL_USER || "root",
      password: process.env.MY_SQL_PASSWORD || "1702",
      database: process.env.MY_SQL_DATABASE || "Shipping",
      port: Number(process.env.MY_SQL_PORT) || 3306,
    },
    TeekayApis: {
      key :  "f5471111e88e4642a0a1b2998bc23840",
      URL1 : `https://staging-api.teekay.com/uat/VesselInfo/GetVesselInfo`,
      URL2 : `https://staging-api.teekay.com/uat/VesselInfo/GetVesselListWithGPS`
    }
  };