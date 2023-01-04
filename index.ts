import express from "express";
import { logger } from "./src/log/logger";
import { AddressInfo } from "net";
import  dataSource  from "./src/datasource/datasource";
var CronJob = require('cron').CronJob;
import { controller } from "./src/datasource/vesselInfo/controller";

let app = express();
let PORT = process.env.PORT || 9120;
// let CronJob = require("cron").CronJob;
let cors = require("cors");

let dataSourceRoutes = dataSource.getRoute();

app.use(cors());
app.use(express.json());
app.use('/',dataSourceRoutes)

app.get('/',(req,res)=>{
    res.json({
    "status": "success",
    "message" : "connected"
})
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));
    res.status(404).json({
      code: 404,
      status: "failed",
      message: "Page Not Found",
    });
  });


const job = new CronJob(
	'0 0 */1 * * *',
	async function () {
    try {
      await controller.apiPath('A');
    } catch (error) {
      logger.log("error", error);
    }
  }
);
job.start()

  let server = app.listen(PORT, function () {
    var { address, port } = server.address() as AddressInfo;
    logger.log("debug", "running at http://" + address + ":" + port);
  });


  