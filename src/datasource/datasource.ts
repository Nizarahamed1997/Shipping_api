import express from "express";
import {vesselInfo} from "./vesselInfo";

class DataSource {
    dataSourceRouter;
    constructor () {
      this.dataSourceRouter = express.Router();
      this.initialize();
    }
  
    initialize() {
      this.dataSourceRouter.use("/vessels",vesselInfo.getRoute())
    }
  
    public getRoute() {
      return this.dataSourceRouter;
    }
  }
  
  const dataSource = new DataSource();
  export default dataSource;