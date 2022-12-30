import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";

class VesselInfo{
    router;
  constructor () {
    this.router = express.Router();
    this.initialize();
  }
  private initialize(){
    this.router.get('/details',async(req,res)=>{
      try{
        let { search }  = req.query;
        console.log(search)
        let vesselDetails = await controller.getVesselDetails(search)
        return res.send(vesselDetails)
      }catch(error){
        logger.log("error",error)
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    })


    this.router.post('/vesselInfo',async(req,res)=>{
      try {
        let finalResponse = await controller.insertVesselDetails();
        return res.send((finalResponse));
      }catch (error) {
        logger.log("error", error);
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    });
  }
  public getRoute(){
    return this.router; 
  }
}

export const vesselInfo = new VesselInfo()